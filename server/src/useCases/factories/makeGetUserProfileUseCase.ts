import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { GetUserProfileUseCase } from '../getUserProfile'

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const profileUseCase = new GetUserProfileUseCase(prismaUsersRepository)
  return profileUseCase
}
