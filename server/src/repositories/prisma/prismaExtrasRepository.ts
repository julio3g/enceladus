import { prisma } from '@/lib/prisma'
import { Extra, Prisma } from '@prisma/client'
import { ExtrasRepository } from '../extrasRepository'

export class PrismaExtrasRepository implements ExtrasRepository {
  async findById(id: string): Promise<Extra | null> {
    const extra = await prisma.extra.findUnique({ where: { id } })
    return extra
  }

  async findByDescription(description: string): Promise<Extra | null> {
    const extra = await prisma.extra.findFirst({ where: { description } })
    return extra
  }

  async findMany(): Promise<Extra[]> {
    const extra = await prisma.extra.findMany()
    return extra
  }

  async findManyByClientId(clientId: string): Promise<Extra[]> {
    const listExtras = await prisma.extra.findMany({
      where: { client_id: clientId },
    })
    return listExtras
  }

  async create(data: Prisma.ExtraCreateInput): Promise<Extra> {
    const extra = await prisma.extra.create({ data })
    return extra
  }
}
