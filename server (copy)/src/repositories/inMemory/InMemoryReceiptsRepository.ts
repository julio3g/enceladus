import { Prisma, Receipt } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ReceiptsRepository } from '../receiptsRepository'

export class InMemoryRecipientsRepository implements ReceiptsRepository {
  public items: Receipt[] = []

  async findById(id: string): Promise<Receipt | null> {
    const receipt = this.items.find((item) => item.id === id)
    if (!receipt) return null
    return receipt
  }

  async findByDescription(description: string): Promise<Receipt | null> {
    const receipt = this.items.find((item) => item.description === description)
    if (!receipt) return null
    return receipt
  }

  async findMany(): Promise<Receipt[]> {
    const all = this.items
    return all
  }

  async findManyByClientId(clientId: string): Promise<Receipt[]> {
    const receipts = this.items.filter((item) => item.client_id === clientId)
    return receipts
  }

  async create(data: Prisma.ReceiptUncheckedCreateInput): Promise<Receipt> {
    const service = {
      id: randomUUID(),
      description: data.description,
      value: data.value,
      client_id: data.client_id ?? null,
      report_id: data.report_id ?? null,
      created_at: new Date(),
    }

    this.items.push(service)

    return service
  }
}
