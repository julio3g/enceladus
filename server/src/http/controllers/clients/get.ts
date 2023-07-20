import { makeGetClientUseCase } from '@/useCases/factories/makeGetClientUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetClientController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      clientId: z.string().uuid(),
    })

    const { clientId } = paramsSchema.parse(request.params)

    const geltClientUseCase = makeGetClientUseCase()
    const getClient = await geltClientUseCase.execute({ clientId })

    return replay.status(200).send(getClient)
  }
}
