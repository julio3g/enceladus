import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../usersRepository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  async findMany(): Promise<User[]> {
    return await prisma.user.findMany({ where: { role: 'MEMBER' } })
  }

  async save(user: User): Promise<void> {
    const updateUser = await prisma.user.findFirst({ where: { id: user.id } })

    updateUser?.name ?? user.name
    updateUser?.email ?? user.email
    updateUser?.role ?? user.role

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  }

  async delete(user: User): Promise<void> {
    await prisma.user.delete({ where: { id: user.id } })
  }

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
  }
}
