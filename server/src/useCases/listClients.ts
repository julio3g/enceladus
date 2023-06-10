import { ClientsRepository } from '@/repositories/clientsRepository'
import { Client } from '@prisma/client'

interface ListClientsUseCaseRequest {}

interface ListClientsUseCaseResponse {
  clients: Client[]
}

export class ListClientsUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute(): Promise<ListClientsUseCaseResponse> {
    const clients = await this.clientsRepository.findMany()

    return { clients }
  }
}
