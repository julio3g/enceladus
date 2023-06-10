import { Prisma, Service } from '@prisma/client'

export interface ServicesRepository {
  findById(id: string): Promise<Service | null>
  findByDescription(description: string): Promise<Service | null>
  findMany(): Promise<Service[]>
  findManyByClientId(clientId: string): Promise<Service[]>
  findManyByReports(reportId: string): Promise<Service[]>
  create(data: Prisma.ServiceUncheckedCreateInput): Promise<Service>
}
