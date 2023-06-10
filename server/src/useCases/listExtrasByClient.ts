import { ExtrasRepository } from '@/repositories/extrasRepository'
import { sumListOfNumbers } from '@/utils/sumListOfNumbers'
import { Extra } from '@prisma/client'

interface ListExtrasByClientUseCaseRequest {
  clientId: string
}

interface ListExtrasByClientUseCaseResponse {
  extras: Extra[]
  generalBalanceOfExtras: number
}

export class ListExtrasByClientUseCase {
  constructor(private extrasRepository: ExtrasRepository) {}

  async execute({
    clientId,
  }: ListExtrasByClientUseCaseRequest): Promise<ListExtrasByClientUseCaseResponse> {
    const extras = await this.extrasRepository.findManyByClientId(clientId)

    const listExtras = extras.map((extra) => extra.value)

    const generalBalanceOfExtras = sumListOfNumbers(listExtras)

    return { extras, generalBalanceOfExtras }
  }
}
