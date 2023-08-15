import { prisma } from '@/lib/prisma'
import { Prisma, Receipt } from '@prisma/client'
import { ReceiptsRepository } from '../receiptsRepository'

export class PrismaReceiptsRepository implements ReceiptsRepository {
  async findById(id: string): Promise<Receipt | null> {
    const receipt = await prisma.receipt.findUnique({ where: { id } })
    return receipt
  }

  async findByDescription(description: string): Promise<Receipt | null> {
    const receipt = await prisma.receipt.findFirst({ where: { description } })
    return receipt
  }

  async findMany(): Promise<Receipt[]> {
    const receipts = await prisma.receipt.findMany()
    return receipts
  }

  async findManyByClientId(clientId: string): Promise<Receipt[]> {
    const receipts = await prisma.receipt.findMany({
      where: { client_id: clientId },
    })
    return receipts
  }

  async delete(data: Receipt): Promise<void> {
    await prisma.receipt.delete({ where: { id: data.id } })
    if (data.client_id) {
      await prisma.client.update({
        where: { id: data.client_id },
        data: {
          balance: {
            decrement: data.value,
          },
        },
      })
    }
  }

  async create(data: Prisma.ReceiptCreateInput): Promise<Receipt> {
    const receipt = await prisma.receipt.create({ data })

    if (receipt.client_id) {
      await prisma.client.update({
        where: { id: receipt.client_id },
        data: {
          balance: {
            increment: receipt.value,
          },
        },
      })
    }

    return receipt
  }
}
