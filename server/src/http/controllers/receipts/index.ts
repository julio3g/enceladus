import { FastifyInstance } from 'fastify'
import { CreateReceiptController } from './create'
import { DeleteReceiptController } from './delete'
import { ListReceiptsByClientController } from './listByClient'

const createReceipt = new CreateReceiptController()
const listReceiptsByClient = new ListReceiptsByClientController()
const deleteReceipt = new DeleteReceiptController()

export async function receiptsRoutes(app: FastifyInstance) {
  app.post('/receipts', createReceipt.handle)
  app.get('/receipts/:clientId', listReceiptsByClient.handle)
  app.delete('/receipts/:receiptId', deleteReceipt.handle)
}
