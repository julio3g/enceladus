import { FastifyInstance } from 'fastify'
import { CreateReceiptController } from './create'
import { ListReceiptsByClientController } from './listByClient'

const createReceipt = new CreateReceiptController()
const listReceiptsByClient = new ListReceiptsByClientController()

export async function receiptsRoutes(app: FastifyInstance) {
  app.post('/receipts', createReceipt.handle)
  app.get('/receipts/:clientId', listReceiptsByClient.handle)
}
