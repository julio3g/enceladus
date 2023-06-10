import { FastifyInstance } from 'fastify'
import { usersRoutes } from '../controllers/users/users.routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
}
