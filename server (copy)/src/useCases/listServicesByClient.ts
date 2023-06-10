import { ServicesRepository } from '@/repositories/servicesRepository'
import { Service } from '@prisma/client'

interface ListServicesByClientUseCaseRequest {
  clientId: string
}

interface ListServicesByClientUseCaseResponse {
  services: Service[]
}

export class ListServicesByClientUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    clientId,
  }: ListServicesByClientUseCaseRequest): Promise<ListServicesByClientUseCaseResponse> {
    const services = await this.servicesRepository.findManyByClientId(clientId)

    return { services }
  }
}
