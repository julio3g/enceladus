import { makeGetUserProfileUseCase } from '@/useCases/factories/makeGetUserProfileUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export class ProfileController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })

    return replay
      .status(200)
      .send({ user: { ...user, password_hash: undefined } })
  }
}
