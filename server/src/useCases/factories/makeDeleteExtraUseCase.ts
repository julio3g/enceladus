import { PrismaExtrasRepository } from '@/repositories/prisma/prismaExtrasRepository'
import { DeleteExtraUseCase } from '../deleteExtra'

export function makeDeleteExtraUseCase() {
  const prismaExtrasRepository = new PrismaExtrasRepository()
  const deleteUseCase = new DeleteExtraUseCase(prismaExtrasRepository)
  return deleteUseCase
}
