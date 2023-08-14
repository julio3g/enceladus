import { makeDeleteClientUseCase } from '@/useCases/factories/makeDeleteClientUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DeleteClientController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      clientId: z.string().uuid(),
    })

    const { clientId } = paramsSchema.parse(request.params)

    const deleteClientUseCase = makeDeleteClientUseCase()
    await deleteClientUseCase.execute({ clientId })

    return replay.status(200).send()
  }
}
