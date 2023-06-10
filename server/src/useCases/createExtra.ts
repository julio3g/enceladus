import { ExtrasRepository } from '@/repositories/extrasRepository'
import { Extra } from '@prisma/client'

interface CreateExtraUseCaseRequest {
  description: string
  value: number
  client_id: string
}

interface CreateExtraUseCaseResponse {
  extra: Extra
}

export class CreateExtraUseCase {
  constructor(private extrasRepository: ExtrasRepository) {}

  async execute({
    description,
    value,
    client_id,
  }: CreateExtraUseCaseRequest): Promise<CreateExtraUseCaseResponse> {
    const extra = await this.extrasRepository.create({
      description,
      value,
      client_id,
    })
    return { extra }
  }
}
