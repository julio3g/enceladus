import { ClientsRepository } from '@/repositories/clientsRepository'
import { Client } from '@prisma/client'

interface CreateClientUseCaseRequest {
  name: string
  contact: string
  balance: number
  phone: string
  created_at: Date
}

interface CreateClientUseCaseResponse {
  client: Client
}

export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    name,
    contact,
    balance,
    phone,
    created_at,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const client = await this.clientsRepository.create({
      name,
      contact,
      phone,
      balance,
      created_at,
    })
    return { client }
  }
}
