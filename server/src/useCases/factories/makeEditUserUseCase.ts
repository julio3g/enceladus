import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { EditUserUseCase } from '../editUser'

export function makeEditUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const editUseCase = new EditUserUseCase(prismaUsersRepository)
  return editUseCase
}
