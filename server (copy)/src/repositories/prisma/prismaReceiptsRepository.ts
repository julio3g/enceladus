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

  async create(data: Prisma.ReceiptCreateInput): Promise<Receipt> {
    const receipt = await prisma.receipt.create({ data })
    return receipt
  }
}
