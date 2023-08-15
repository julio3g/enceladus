import { FastifyInstance } from 'fastify'
import { clientsRoutes } from '../controllers/clients'
import { extrasRoutes } from '../controllers/extras'
import { receiptsRoutes } from '../controllers/receipts'
import { servicesRoutes } from '../controllers/services'
import { usersRoutes } from '../controllers/users'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(clientsRoutes)
  app.register(extrasRoutes)
  app.register(servicesRoutes)
  app.register(receiptsRoutes)
}
