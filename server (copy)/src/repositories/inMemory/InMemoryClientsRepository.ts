import { Client, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ClientsRepository } from '../clientsRepository'

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = []

  async findById(id: string): Promise<Client | null> {
    const client = this.items.find((item) => item.id === id)
    if (!client) return null
    return client
  }

  async findByName(name: string): Promise<Client | null> {
    const client = this.items.find((item) => item.name === name)
    if (!client) return null
    return client
  }

  async findMany(): Promise<Client[]> {
    return this.items
  }

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = {
      id: randomUUID(),
      name: data.name,
      contact: data.contact,
      phone: data.phone,
      balance: data.balance,
      created_at: new Date(),
    }

    this.items.push(client)

    return client
  }
}
