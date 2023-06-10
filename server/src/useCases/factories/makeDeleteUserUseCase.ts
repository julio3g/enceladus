import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { DeleteUserUseCase } from '../deleteUser'

export function makeDeleteUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const deleteUseCase = new DeleteUserUseCase(prismaUsersRepository)
  return deleteUseCase
}
