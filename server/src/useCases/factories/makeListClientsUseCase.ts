import { PrismaClientsRepository } from '@/repositories/prisma/prismaClientsRepository'
import { ListClientsUseCase } from '../listClients'

export function makeListClientsUseCase() {
  const prismaClientsRepository = new PrismaClientsRepository()
  const findManyUseCase = new ListClientsUseCase(prismaClientsRepository)
  return findManyUseCase
}
