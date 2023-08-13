import { FastifyInstance } from 'fastify'
import { CreateClientController } from './create'
import { ListClientsController } from './fetch'
import { GetClientController } from './get'
import { SetBalanceClientController } from './setBalanceByClient'

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
  app.get('/clients/:clientId', new GetClientController().handle)
  app.patch(
    '/clients/:clientId/balance',
    new SetBalanceClientController().handle,
  )
}
