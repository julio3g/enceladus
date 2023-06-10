import { ReceiptsRepository } from '@/repositories/receiptsRepository'
import { Receipt } from '@prisma/client'

interface ListReceiptsByClientUseCaseRequest {
  clientId: string
}

interface ListReceiptsByClientUseCaseResponse {
  receipts: Receipt[]
}

export class ListReceiptsByClientUseCase {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute({
    clientId,
  }: ListReceiptsByClientUseCaseRequest): Promise<ListReceiptsByClientUseCaseResponse> {
    const receipts = await this.receiptsRepository.findManyByClientId(clientId)

    return { receipts }
  }
}
