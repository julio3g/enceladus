import { Client, Prisma } from '@prisma/client'

export interface ClientsRepository {
  findById(id: string): Promise<Client | null>
  findByName(name: string): Promise<Client | null>
  findMany(): Promise<Client[]>
  create(data: Prisma.ClientCreateInput): Promise<Client>
  delete(data: Client): Promise<void>
  save(client: Client): Promise<Client | null>
}
