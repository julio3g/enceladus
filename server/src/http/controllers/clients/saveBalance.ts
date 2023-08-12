import { makeGetClientUseCase } from '@/useCases/factories/makeGetClientUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetBalanceClientController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      clientId: z.string().uuid(),
    })

    const { clientId } = paramsSchema.parse(request.params)

    const getClientUseCase = makeGetClientUseCase()
    const getClient = await getClientUseCase.execute({ clientId })

    return replay.status(200).send(getClient)
  }
}
