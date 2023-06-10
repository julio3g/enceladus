import { makeDeleteUserUseCase } from '@/useCases/factories/makeDeleteUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DeleteUserController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(request.params)

    const deleteUserUseCase = makeDeleteUserUseCase()
    await deleteUserUseCase.execute({ userId })

    return replay.status(200).send()
  }
}
