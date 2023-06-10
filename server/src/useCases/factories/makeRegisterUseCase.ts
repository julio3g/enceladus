import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(prismaUsersRepository)
  return useCase
}
