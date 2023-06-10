import { makeListClientsUseCase } from '@/useCases/factories/makeListClientsUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export class ListClientsController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const listClientsUseCase = makeListClientsUseCase()
    const all = await listClientsUseCase.execute()

    return replay.status(200).send(all)
  }
}
