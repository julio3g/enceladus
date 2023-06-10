import { prisma } from '@/lib/prisma'
import { Prisma, Service } from '@prisma/client'
import { ServicesRepository } from '../servicesRepository'

export class PrismaServicesRepository implements ServicesRepository {
  async findById(id: string): Promise<Service | null> {
    const service = await prisma.service.findUnique({ where: { id } })
    return service
  }

  async findByDescription(description: string): Promise<Service | null> {
    const service = await prisma.service.findFirst({ where: { description } })
    return service
  }

  async findMany(): Promise<Service[]> {
    const all = await prisma.service.findMany()
    return all
  }

  async create(data: Prisma.ServiceUncheckedCreateInput): Promise<Service> {
    const service = await prisma.service.create({ data })
    return service
  }
}
