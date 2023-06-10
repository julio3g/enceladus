import { FastifyInstance } from 'fastify'
import { CreateClientController } from './create'
import { ListClientsController } from './fetch'

export async function clientsRoutes(app: FastifyInstance) {
  app.post(
    '/clients',
    // { onRequest: [verifyUserRole('ADMIN')] },
    new CreateClientController().handle,
  )
  app.get(
    '/clients',
    // { onRequest: [verifyJWT] },
    new ListClientsController().handle,
  )
}
