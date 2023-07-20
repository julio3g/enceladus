import { ClientsRepository } from '@/repositories/clientsRepository'
import { Client } from '@prisma/client'
import { ClientNotFound } from './errors/ClientNotFound'

interface GetClientUseCaseRequest {
  clientId: string
}

interface GetClientUseCaseResponse {
  client: Client
}

export class GetClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    clientId,
  }: GetClientUseCaseRequest): Promise<GetClientUseCaseResponse> {
    const client = await this.clientsRepository.findById(clientId)

    if (!client) throw new ClientNotFound()

    return { client }
  }
}
