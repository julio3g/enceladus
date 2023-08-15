import { FastifyInstance } from 'fastify'
import { CreateExtraController } from './create'
import { DeleteExtraController } from './delete'
import { ListExtrasByClientController } from './listByClient'

const createExtra = new CreateExtraController()
const listExtrasByClient = new ListExtrasByClientController()
const deleteExtra = new DeleteExtraController()

export async function extrasRoutes(app: FastifyInstance) {
  app.post('/extras', createExtra.handle)
  app.get('/extras/:clientId', listExtrasByClient.handle)
  app.delete('/extras/:extraId', deleteExtra.handle)
}
