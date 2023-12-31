import { ReceiptsRepository } from '@/repositories/receiptsRepository'
import { Receipt } from '@prisma/client'

interface CreateReceiptUseCaseRequest {
  description: string
  value: number
  client_id: string
}

interface CreateReceiptUseCaseResponse {
  receipt: Receipt
}

export class CreateReceiptUseCase {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute({
    description,
    value,
    client_id,
  }: CreateReceiptUseCaseRequest): Promise<CreateReceiptUseCaseResponse> {
    const receipt = await this.receiptsRepository.create({
      description,
      value,
      client_id,
    })
    return { receipt }
  }
}
