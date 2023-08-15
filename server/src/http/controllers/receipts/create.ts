import { makeCreateReceiptUseCase } from '@/useCases/factories/makeCreateReceiptUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateReceiptController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const createReceiptBodySchema = z.object({
      description: z.string(),
      value: z.number().refine((value) => {
        return Number(value.toFixed(2)) === value
      }),
      client_id: z.string().uuid(),
    })

    const { description, value, client_id } = createReceiptBodySchema.parse(
      request.body,
    )

    const createReceiptUseCase = makeCreateReceiptUseCase()
    await createReceiptUseCase.execute({ description, value, client_id })

    return replay.status(201).send()
  }
}
