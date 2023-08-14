import { makeDeleteReceiptUseCase } from '@/useCases/factories/makeDeleteReceiptUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DeleteReceiptController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      receiptId: z.string().uuid(),
    })

    const { receiptId } = paramsSchema.parse(request.params)

    const deleteReceiptUseCase = makeDeleteReceiptUseCase()
    await deleteReceiptUseCase.execute({ receiptId })

    return replay.status(200).send()
  }
}
