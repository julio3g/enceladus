import { ServicesRepository } from '@/repositories/servicesRepository'
import { sumListOfNumbers } from '@/utils/sumListOfNumbers'
import { Service } from '@prisma/client'

interface ListServicesByClientUseCaseRequest {
  clientId: string
}

interface ListServicesByClientUseCaseResponse {
  services: Service[]
  generalBalanceOfServices: number
}

export class ListServicesByClientUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    clientId,
  }: ListServicesByClientUseCaseRequest): Promise<ListServicesByClientUseCaseResponse> {
    const services = await this.servicesRepository.findManyByClientId(clientId)

    const generalBalanceOfServices = sumListOfNumbers(
      services.map((service) => service.value),
    )

    return { services, generalBalanceOfServices }
  }
}
