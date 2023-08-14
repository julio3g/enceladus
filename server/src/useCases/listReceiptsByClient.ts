import { ReceiptsRepository } from '@/repositories/receiptsRepository'
import { sumListOfNumbers } from '@/utils/sumListOfNumbers'
import { Receipt } from '@prisma/client'

interface ListReceiptsByClientUseCaseRequest {
  clientId: string
}

interface ListReceiptsByClientUseCaseResponse {
  receipts: Receipt[]
  generalBalanceOfReceipts: number
}

export class ListReceiptsByClientUseCase {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute({
    clientId,
  }: ListReceiptsByClientUseCaseRequest): Promise<ListReceiptsByClientUseCaseResponse> {
    const receipts = await this.receiptsRepository.findManyByClientId(clientId)

    const listReceipts = receipts.map((receipt) =>
      parseFloat(receipt.value.toString()),
    )

    const generalBalanceOfReceipts = sumListOfNumbers(listReceipts)

    return { receipts, generalBalanceOfReceipts }
  }
}
