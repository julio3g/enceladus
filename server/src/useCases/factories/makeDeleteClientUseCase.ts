import { PrismaClientsRepository } from '@/repositories/prisma/prismaClientsRepository'
import { DeleteClientUseCase } from '../deleteClient'

export function makeDeleteClientUseCase() {
  const prismaClientsRepository = new PrismaClientsRepository()
  const deleteUseCase = new DeleteClientUseCase(prismaClientsRepository)
  return deleteUseCase
}
