import { PrismaExtrasRepository } from '@/repositories/prisma/prismaExtrasRepository'
import { ListExtrasByClientUseCase } from '../listExtrasByClient'
import { SetBalanceByClientUseCase } from '../setBalanceByClient'
import { PrismaClientsRepository } from '@/repositories/prisma/prismaClientsRepository'
import { PrismaServicesRepository } from '@/repositories/prisma/prismaServicesRepository'
import { PrismaReceiptsRepository } from '@/repositories/prisma/prismaReceiptsRepository'

export function makeSetBalanceByClientUseCase() {
  const prismaClientsRepository = new PrismaClientsRepository()
  const servicesRepository = new PrismaServicesRepository()
  const extrasRepository = new PrismaExtrasRepository()
  const receiptsRepository = new PrismaReceiptsRepository()

  const setBalanceByClient = new SetBalanceByClientUseCase(
    prismaClientsRepository,
    servicesRepository,
    extrasRepository,
    receiptsRepository,
  )

  return setBalanceByClient
}
