import { PrismaClientsRepository } from '@/repositories/prisma/prismaClientsRepository'
import { GetClientUseCase } from '../getClient'

export function makeGetClientUseCase() {
  const prismaClientsRepository = new PrismaClientsRepository()
  const clientUseCase = new GetClientUseCase(prismaClientsRepository)
  return clientUseCase
}
