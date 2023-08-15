import { makeCreateClientUseCase } from '@/useCases/factories/makeCreateClientUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateClientController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const createClientBodySchema = z.object({
      name: z.string(),
      contact: z.string(),
      phone: z.string(),
      description: z.string(),
      registration: z.number(),
    })

    const { name, contact, phone, description, registration } =
      createClientBodySchema.parse(request.body)

    const createClientUseCase = makeCreateClientUseCase()
    await createClientUseCase.execute({
      name,
      contact,
      phone,
      description,
      registration,
    })

    return replay.status(201).send()
  }
}
