import { ExtrasRepository } from '@/repositories/extrasRepository'
import { Extra } from '@prisma/client'

interface ListExtrasByClientUseCaseRequest {
  clientId: string
}

interface ListExtrasByClientUseCaseResponse {
  extras: Extra[]
}

export class ListExtrasByClientUseCase {
  constructor(private extrasRepository: ExtrasRepository) {}

  async execute({
    clientId,
  }: ListExtrasByClientUseCaseRequest): Promise<ListExtrasByClientUseCaseResponse> {
    const extras = await this.extrasRepository.findManyByClientId(clientId)

    return { extras }
  }
}
