import { FastifyInstance } from 'fastify'
import { RegisterController } from './register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', new RegisterController().handle)
  // app.post('/sessions', authenticate)
  // app.patch('/token/refresh', refresh)
  // Authenticated
  // app.get('/me', { onRequest: [verifyJWT] }, profile)
}
