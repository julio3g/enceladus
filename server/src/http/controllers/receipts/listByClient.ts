import { makeListReceiptsByClientUseCase } from '@/useCases/factories/makeListReceiptsByClientUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class ListReceiptsByClientController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      clientId: z.string().uuid(),
    })

    const { clientId } = paramsSchema.parse(request.params)

    const createReceiptUseCase = makeListReceiptsByClientUseCase()
    const all = await createReceiptUseCase.execute({ clientId })

    return replay.status(200).send(all)
  }
}
