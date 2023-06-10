import { ServicesRepository } from '@/repositories/servicesRepository'
import { Service } from '@prisma/client'

interface CreateServiceUseCaseRequest {
  description: string
  client_id: string
  value: number
}

interface CreateServiceUseCaseResponse {
  service: Service
}

export class CreateServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    description,
    value,
    client_id,
  }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const service = await this.servicesRepository.create({
      description,
      value,
      client_id,
    })

    return { service }
  }
}
