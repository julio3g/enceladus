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

  async findManyByClientId(clientId: string): Promise<Service[]> {
    const findManyByClientId = await prisma.service.findMany({
      where: { client_id: clientId },
    })
    return findManyByClientId
  }

  async findManyByReportId(reportId: string): Promise<Service[]> {
    const findManyByReportId = await prisma.service.findMany({
      where: { report_id: reportId },
    })
    return findManyByReportId
  }

  async delete(data: Service): Promise<void> {
    await prisma.service.delete({ where: { id: data.id } })

    await prisma.client.update({
      where: { id: data.client_id },
      data: {
        balance: {
          increment: data.value,
        },
      },
    })
  }

  async create(data: Prisma.ServiceUncheckedCreateInput): Promise<Service> {
    const service = await prisma.service.create({ data })

    await prisma.client.update({
      where: { id: service.client_id },
      data: {
        balance: {
          decrement: service.value,
        },
      },
    })

    return service
  }
}
