import { makeGetClientUseCase } from '@/useCases/factories/makeGetClientUseCase'
import { makeSetBalanceByClientUseCase } from '@/useCases/factories/makeSaveBalanceByClientUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { set, z } from 'zod'

export class GetClientController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      clientId: z.string().uuid(),
    })

    const { clientId } = paramsSchema.parse(request.params)

    const getClientUseCase = makeGetClientUseCase()
    const setBalance = makeSetBalanceByClientUseCase()
    await setBalance.execute({ clientId })
    const getClient = await getClientUseCase.execute({ clientId })

    return replay.status(200).send(getClient)
  }
}
