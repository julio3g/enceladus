import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { GetUserProfileUseCase } from '../getUserProfileUseCase'

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const profileUseCase = new GetUserProfileUseCase(prismaUsersRepository)
  return profileUseCase
}
