import { makeRegisterUseCase } from '@factories/makeRegisterUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class RegisterController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({ name, email, password })

    return replay.status(201).send()
  }
}
