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

  async delete(data: Extra): Promise<void> {
    await prisma.extra.delete({ where: { id: data.id } })

    if (data.client_id) {
      await prisma.client.update({
        where: { id: data.client_id },
        data: {
          balance: {
            increment: data.value,
          },
        },
      })
    }
  }

  async create(data: Prisma.ExtraUncheckedCreateInput): Promise<Extra> {
    const extra = await prisma.extra.create({ data })

    if (extra.client_id) {
      await prisma.client.update({
        where: { id: extra.client_id },
        data: {
          balance: {
            decrement: extra.value,
          },
        },
      })
    }

    return extra
  }
}
