import { Prisma, Service } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ServicesRepository } from '../servicesRepository'

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Service[] = []

  async findById(id: string): Promise<Service | null> {
    const service = this.items.find((item) => item.id === id)
    if (!service) return null
    return service
  }

  async findByDescription(description: string): Promise<Service | null> {
    const service = this.items.find((item) => item.description === description)
    if (!service) return null
    return service
  }

  async findMany(): Promise<Service[]> {
    const all = this.items
    return all
  }

  async findManyByClientId(clientId: string): Promise<Service[]> {
    const services = this.items.filter((item) => item.client_id === clientId)
    return services
  }

  findManyByReports(reportId: string): Promise<Service[]> {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.ServiceUncheckedCreateInput): Promise<Service> {
    const service = {
      id: randomUUID(),
      description: data.description,
      value: data.value,
      client_id: data.client_id,
      report_id: data.report_id ?? null,
      created_at: new Date(),
    }

    this.items.push(service)

    return service
  }
}
