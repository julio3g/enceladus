import { makeCreateExtraUseCase } from '@/useCases/factories/makeCreateExtraUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateExtraController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const createExtraBodySchema = z.object({
      description: z.string(),
      value: z.number().refine((value) => {
        return Number(value.toFixed(2)) === value
      }),
      client_id: z.string().uuid(),
    })

    const { description, value, client_id } = createExtraBodySchema.parse(
      request.body,
    )

    const createExtraUseCase = makeCreateExtraUseCase()
    await createExtraUseCase.execute({ description, value, client_id })

    return replay.status(201).send()
  }
}
