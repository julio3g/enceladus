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

  async delete(data: Client): Promise<void> {
    const index = this.items.findIndex((item) => item.id === data.id)
    if (index !== -1) this.items.splice(index, 1)
  }

  async save(client: Client): Promise<Client> {
    const clientIndex = this.items.findIndex((item) => item.id === client.id)

    if (clientIndex >= 0) this.items[clientIndex] = client

    return client
  }

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const balanceDecimal =
      data.balance !== undefined
        ? new Prisma.Decimal(data.balance.toString())
        : new Prisma.Decimal('0')

    const client = {
      id: data.id ?? randomUUID(),
      name: data.name,
      contact: data.contact,
      phone: data.phone,
      description: data.description,
      registration: data.registration ?? 0,
      balance: balanceDecimal,
      created_at: new Date(),
    }

    this.items.push(client)

    return client
  }

  async saveBalance(client: Client): Promise<Client> {
    const clientIndex = this.items.findIndex((item) => item.id === client.id)

    if (clientIndex >= 0) {
      this.items[clientIndex] = client
    }

    return client
  }
}
