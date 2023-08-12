import { makeListServicesByClientUseCase } from '@/useCases/factories/makeListServicesByClientUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class ListServicesByClientController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      clientId: z.string().uuid(),
    })

    const { clientId } = paramsSchema.parse(request.params)

    const listServicesUseCase = makeListServicesByClientUseCase()
    const all = await listServicesUseCase.execute({ clientId })

    return replay.status(200).send(all)
  }
}
