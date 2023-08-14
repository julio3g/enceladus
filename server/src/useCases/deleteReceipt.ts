import { AppError } from '@/http/controllers/errors'
import { ReceiptsRepository } from '@/repositories/receiptsRepository'
import { Receipt } from '@prisma/client'

interface DeleteReceiptUseCaseRequest {
  receiptId: string
}

interface DeleteReceiptUseCaseResponse {
  receipt: Receipt
}

export class DeleteReceiptUseCase {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute({
    receiptId,
  }: DeleteReceiptUseCaseRequest): Promise<DeleteReceiptUseCaseResponse> {
    const receipt = await this.receiptsRepository.findById(receiptId)

    if (!receipt) throw new AppError('Receipt not found.')

    await this.receiptsRepository.delete(receipt)

    return { receipt }
  }
}
