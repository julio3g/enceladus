import { Extra, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ExtrasRepository } from '../extrasRepository'

export class InMemoryExtrasRepository implements ExtrasRepository {
  public items: Extra[] = []

  async findById(id: string): Promise<Extra | null> {
    const extra = this.items.find((item) => item.id === id)
    if (!extra) return null
    return extra
  }

  async findByDescription(description: string): Promise<Extra | null> {
    const extra = this.items.find((item) => item.description === description)
    if (!extra) return null
    return extra
  }

  async findMany(): Promise<Extra[]> {
    const all = this.items
    return all
  }

  async findManyByClientId(clientId: string): Promise<Extra[]> {
    const extras = this.items.filter((item) => item.client_id === clientId)
    return extras
  }

  async delete(data: Extra): Promise<void> {
    const index = this.items.findIndex((item) => item.id === data.id)
    if (index !== -1) this.items.splice(index, 1)
  }

  async create(data: Prisma.ExtraUncheckedCreateInput): Promise<Extra> {
    const extra = {
      id: data.id ?? randomUUID(),
      description: data.description,
      value: new Prisma.Decimal(data.value.toString()),
      third_id: data.third_id ?? null,
      client_id: data.client_id ?? null,
      created_at: new Date(),
    }

    this.items.push(extra)

    return extra
  }
}
