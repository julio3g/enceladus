import { ServicesRepository } from '@/repositories/servicesRepository'
import { Service } from '@prisma/client'

interface CreateServiceUseCaseRequest {
  description: string
  client_id: string
  value: number
  created_at: Date
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
    created_at,
  }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const service = await this.servicesRepository.create({
      description,
      value,
      client_id,
      created_at,
    })
    return { service }
  }
}
