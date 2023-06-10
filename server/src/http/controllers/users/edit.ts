import { makeEditUserUseCase } from '@/useCases/factories/makeEditUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class EditUserController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const userBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      role: z.enum(['ADMIN', 'MEMBER']),
    })

    const { name, email, role } = userBodySchema.parse(request.body)

    const editUserUseCase = makeEditUserUseCase()
    const { user } = await editUserUseCase.execute({
      userId: request.user.sub,
      name,
      email,
      role,
    })

    return replay.status(200).send({ user })
  }
}
