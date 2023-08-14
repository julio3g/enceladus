import { makeDeleteServiceUseCase } from '@/useCases/factories/makeDeleteServiceUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DeleteServiceController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      serviceId: z.string().uuid(),
    })

    const { serviceId } = paramsSchema.parse(request.params)

    const deleteServiceUseCase = makeDeleteServiceUseCase()
    await deleteServiceUseCase.execute({ serviceId })

    return replay.status(200).send()
  }
}
