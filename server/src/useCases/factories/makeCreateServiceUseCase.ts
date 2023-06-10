import { PrismaServicesRepository } from '@/repositories/prisma/prismaServicesRepository'
import { CreateServiceUseCase } from '../createService'

export function makeCreateServiceUseCase() {
  const prismaServicesRepository = new PrismaServicesRepository()
  const useCase = new CreateServiceUseCase(prismaServicesRepository)
  return useCase
}
