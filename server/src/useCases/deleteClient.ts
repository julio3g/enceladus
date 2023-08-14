import { AppError } from '@/http/controllers/errors'
import { ClientsRepository } from '@/repositories/clientsRepository'
import { Client } from '@prisma/client'

interface DeleteClientUseCaseRequest {
  clientId: string
}

interface DeleteClientUseCaseResponse {
  client: Client
}

export class DeleteClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    clientId,
  }: DeleteClientUseCaseRequest): Promise<DeleteClientUseCaseResponse> {
    const client = await this.clientsRepository.findById(clientId)

    if (!client) throw new AppError('Client not found.')

    await this.clientsRepository.delete(client)

    return { client }
  }
}
