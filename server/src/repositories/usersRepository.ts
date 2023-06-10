import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findMany(): Promise<User[]>
  create(data: Prisma.UserCreateInput): Promise<User>
  save(user: User): Promise<void>
  delete(user: User): Promise<void>
}
