import { prisma } from '@/lib/prisma'
import { Client, Prisma } from '@prisma/client'
import { ClientsRepository } from '../clientsRepository'

export class PrismaClientsRepository implements ClientsRepository {
  async findById(id: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({ where: { id } })
    return client
  }

  async findByName(name: string): Promise<Client | null> {
    const client = await prisma.client.findFirst({ where: { name } })
    return client
  }

  async findMany(): Promise<Client[]> {
    const all = prisma.client.findMany({ orderBy: { created_at: 'desc' } })
    return all
  }

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = await prisma.client.create({ data })
    return client
  }

  async delete(data: Client): Promise<void> {
    await prisma.client.delete({ where: { id: data.id } })
  }

  async save(data: Client): Promise<Client | null> {
    const client = await prisma.client.update({
      where: { id: data.id },
      data,
    })
    return client
  }
}
