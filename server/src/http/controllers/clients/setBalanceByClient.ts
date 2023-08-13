import { makeSetBalanceByClientUseCase } from '@/useCases/factories/makeSetBalanceByClientUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class SetBalanceClientController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      clientId: z.string().uuid(),
    })

    const { clientId } = paramsSchema.parse(request.params)

    const setBalanceUseCase = makeSetBalanceByClientUseCase()
    const setBalance = await setBalanceUseCase.execute({ clientId })

    return replay.status(200).send(setBalance)
  }
}
