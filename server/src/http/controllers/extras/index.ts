import { FastifyInstance } from 'fastify'
import { CreateExtraController } from './create'
import { ListExtrasByClientController } from './listByClient'

const createExtra = new CreateExtraController()
const listExtrasByClient = new ListExtrasByClientController()

export async function extrasRoutes(app: FastifyInstance) {
  app.post('/', createExtra.handle)
  app.get('/:clientId', listExtrasByClient.handle)
}
