import { PrismaReceiptsRepository } from '@/repositories/prisma/prismaReceiptsRepository'
import { DeleteReceiptUseCase } from '../deleteReceipt'

export function makeDeleteReceiptUseCase() {
  const prismaReceiptsRepository = new PrismaReceiptsRepository()
  const deleteUseCase = new DeleteReceiptUseCase(prismaReceiptsRepository)
  return deleteUseCase
}
