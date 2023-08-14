import { PrismaServicesRepository } from '@/repositories/prisma/prismaServicesRepository'
import { DeleteServiceUseCase } from '../deleteService'

export function makeDeleteServiceUseCase() {
  const prismaServicesRepository = new PrismaServicesRepository()
  const deleteUseCase = new DeleteServiceUseCase(prismaServicesRepository)
  return deleteUseCase
}
