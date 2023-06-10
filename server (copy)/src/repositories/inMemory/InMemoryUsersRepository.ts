import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../usersRepository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)
    if (!user) return null
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)
    if (!user) return null
    return user
  }

  async findMany(): Promise<User[]> {
    const users = this.items
    return users
  }

  async save(data: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)
    this.items[itemIndex] = data
  }

  async deleteById(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)
    this.items.slice(itemIndex, 1)
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role ?? 'MEMBER',
      password_hash: data.password_hash,
      updated_at: new Date(),
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
