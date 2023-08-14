import { Extra, Prisma } from '@prisma/client'

export interface ExtrasRepository {
  findById(id: string): Promise<Extra | null>
  findByDescription(description: string): Promise<Extra | null>
  findMany(): Promise<Extra[]>
  findManyByClientId(clientId: string): Promise<Extra[]>
  create(data: Prisma.ExtraUncheckedCreateInput): Promise<Extra>
}
