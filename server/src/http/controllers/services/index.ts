import { FastifyInstance } from 'fastify'
import { CreateServiceController } from './create'
import { ListServicesByClientController } from './listByClient'

const createService = new CreateServiceController()
const listExtrasByClient = new ListServicesByClientController()

export async function servicesRoutes(app: FastifyInstance) {
  // app.post('/', { onRequest: [verifyUserRole('ADMIN')] }, createService.handle)
  app.post('/services', createService.handle)
  app.get('/services/:clientId', listExtrasByClient.handle)
}
