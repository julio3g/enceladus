import { PrismaExtrasRepository } from '@/repositories/prisma/prismaExtrasRepository'
import { ListExtrasByClientUseCase } from '../listExtrasByClient'

export function makeListExtrasByClientUseCase() {
  const prismaExtrasRepository = new PrismaExtrasRepository()
  const listExtrasByClientUseCase = new ListExtrasByClientUseCase(
    prismaExtrasRepository,
  )
  return listExtrasByClientUseCase
}
