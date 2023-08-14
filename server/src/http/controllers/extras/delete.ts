import { makeDeleteExtraUseCase } from '@/useCases/factories/makeDeleteExtraUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DeleteExtraController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    const paramsSchema = z.object({
      extraId: z.string().uuid(),
    })

    const { extraId } = paramsSchema.parse(request.params)

    const deleteExtraUseCase = makeDeleteExtraUseCase()
    await deleteExtraUseCase.execute({ extraId })

    return replay.status(200).send()
  }
}
