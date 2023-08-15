import { FastifyInstance } from 'fastify'
import { CreateServiceController } from './create'
import { DeleteServiceController } from './delete'
import { ListServicesByClientController } from './listByClient'

const createService = new CreateServiceController()
const listServicesByClient = new ListServicesByClientController()
const deleteService = new DeleteServiceController()

export async function servicesRoutes(app: FastifyInstance) {
  // app.post('/', { onRequest: [verifyUserRole('ADMIN')] }, createService.handle)
  app.post('/services', createService.handle)
  app.get('/services/:clientId', listServicesByClient.handle)
  app.delete('/services/:serviceId', deleteService.handle)
}
