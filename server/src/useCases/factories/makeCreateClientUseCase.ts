import { PrismaClientsRepository } from '@/repositories/prisma/prismaClientsRepository'
import { CreateClientUseCase } from '../createClient'

export function makeCreateClientUseCase() {
  const prismaClientsRepository = new PrismaClientsRepository()
  const useCase = new CreateClientUseCase(prismaClientsRepository)
  return useCase
}
