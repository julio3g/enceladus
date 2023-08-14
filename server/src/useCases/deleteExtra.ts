import { AppError } from '@/http/controllers/errors'
import { ExtrasRepository } from '@/repositories/extrasRepository'
import { Extra } from '@prisma/client'

interface DeleteExtraUseCaseRequest {
  extraId: string
}

interface DeleteExtraUseCaseResponse {
  extra: Extra
}

export class DeleteExtraUseCase {
  constructor(private extrasRepository: ExtrasRepository) {}

  async execute({
    extraId,
  }: DeleteExtraUseCaseRequest): Promise<DeleteExtraUseCaseResponse> {
    const extra = await this.extrasRepository.findById(extraId)

    if (!extra) throw new AppError('Extra not found.')

    await this.extrasRepository.delete(extra)

    return { extra }
  }
}
