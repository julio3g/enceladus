import { PrismaClientsRepository } from '@/repositories/prisma/prismaClientsRepository'
import { CreateClientUseCase } from '../createClientUseCase'

export function makeCreateClientUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const useCase = new CreateClientUseCase(clientsRepository)

  return useCase
}
