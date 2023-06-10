import { ReceiptsRepository } from '@/repositories/receiptsRepository'
import { Receipt } from '@prisma/client'

interface CreateReceiptUseCaseRequest {
  description: string
  value: number
}

interface CreateReceiptUseCaseResponse {
  receipt: Receipt
}

export class CreateReceiptUseCase {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute({
    description,
    value,
  }: CreateReceiptUseCaseRequest): Promise<CreateReceiptUseCaseResponse> {
    const receipt = await this.receiptsRepository.create({
      description,
      value,
    })
    return { receipt }
  }
}
