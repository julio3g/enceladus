import { makeCreateServiceUseCase } from '@/useCases/factories/makeCreateServiceUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateServiceController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const createExtraBodySchema = z.object({
      description: z.string(),
      value: z.number(),
      client_id: z.string().uuid(),
    })

    const { description, value, client_id } = createExtraBodySchema.parse(
      request.body,
    )

    const createExtraUseCase = makeCreateServiceUseCase()
    await createExtraUseCase.execute({ description, value, client_id })

    return replay.status(201).send()
  }
}
