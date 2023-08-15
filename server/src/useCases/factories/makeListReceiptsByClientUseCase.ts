import { PrismaReceiptsRepository } from '@/repositories/prisma/prismaReceiptsRepository'
import { ListReceiptsByClientUseCase } from '../listReceiptsByClient'

export function makeListReceiptsByClientUseCase() {
  const prismaReceiptsRepository = new PrismaReceiptsRepository()
  const listReceiptsByClientUseCase = new ListReceiptsByClientUseCase(
    prismaReceiptsRepository
  )

  return listReceiptsByClientUseCase
}
