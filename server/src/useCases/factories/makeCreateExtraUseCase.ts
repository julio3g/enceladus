import { PrismaExtrasRepository } from '@/repositories/prisma/prismaExtrasRepository'
import { CreateExtraUseCase } from '../createExtra'

export function makeCreateExtraUseCase() {
  const prismaExtrasRepository = new PrismaExtrasRepository()
  const useCase = new CreateExtraUseCase(prismaExtrasRepository)
  return useCase
}
