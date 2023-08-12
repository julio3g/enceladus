import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { AppError } from './http/controllers/errors'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false, // não é um cookie assinado
  },
  sign: {
    expiresIn: '10m', // 10 minutes
  },
})

app.register(cors, {
  origin: true,
  credentials: true,
})

app.register(fastifyCookie)
app.register(appRoutes)
app.setErrorHandler((error, _, replay) => {
  if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }
  if (error instanceof AppError)
    return replay.status(error.statusCode).send({ message: error.message })
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like (Datadog/NewRelic/Sentry)
  }

  return replay.status(500).send({ message: 'Internal server Error.' })
})
