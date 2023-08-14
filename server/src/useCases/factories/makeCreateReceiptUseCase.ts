import { PrismaReceiptsRepository } from '@/repositories/prisma/prismaReceiptsRepository'
import { CreateReceiptUseCase } from '../createReceipt'

export function makeCreateReceiptUseCase() {
  const prismaReceiptsRepository = new PrismaReceiptsRepository()
  const useCase = new CreateReceiptUseCase(prismaReceiptsRepository)
  return useCase
}
