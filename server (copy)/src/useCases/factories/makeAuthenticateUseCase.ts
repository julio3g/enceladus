import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { AuthenticateUseCase } from '../authenticateUseCase'

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
  return authenticateUseCase
}
