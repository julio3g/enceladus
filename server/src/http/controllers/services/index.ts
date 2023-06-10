import { FastifyInstance } from 'fastify'
import { CreateServiceController } from './create'

const createService = new CreateServiceController()

export async function servicesRoutes(app: FastifyInstance) {
  // app.post('/', { onRequest: [verifyUserRole('ADMIN')] }, createService.handle)
  app.post('/', createService.handle)
  // app.get('/:clientId', { onRequest: [verifyJWT] }, listExtrasByClient.handle)
}
