import { ClientsRepository } from '@/repositories/clientsRepository'
import { Client } from '@prisma/client'

interface CreateClientUseCaseRequest {
  name: string
  contact: string
  phone: string
  description: string
  registration: number
}

interface CreateClientUseCaseResponse {
  client: Client
}

export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    name,
    contact,
    phone,
    description,
    registration,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const client = await this.clientsRepository.create({
      name,
      contact,
      phone,
      description,
      registration,
    })
    return { client }
  }
}
