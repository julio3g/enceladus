import { Prisma, Receipt } from '@prisma/client'

export interface ReceiptsRepository {
  findById(id: string): Promise<Receipt | null>
  findByDescription(description: string): Promise<Receipt | null>
  findMany(): Promise<Receipt[]>
  findManyByClientId(clientId: string): Promise<Receipt[]>
  create(data: Prisma.ReceiptCreateInput): Promise<Receipt>
}
