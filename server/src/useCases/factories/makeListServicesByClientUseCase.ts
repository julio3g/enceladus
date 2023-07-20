import { PrismaServicesRepository } from '@/repositories/prisma/prismaServicesRepository'
import { ListServicesByClientUseCase } from '../listServicesByClient'

export function makeListServicesByClientUseCase() {
  const prismaServicesRepository = new PrismaServicesRepository()
  const listServicesByClientUseCase = new ListServicesByClientUseCase(
    prismaServicesRepository,
  )
  return listServicesByClientUseCase
}
