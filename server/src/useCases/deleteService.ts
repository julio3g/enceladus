import { AppError } from '@/http/controllers/errors'
import { ServicesRepository } from '@/repositories/servicesRepository'
import { Service } from '@prisma/client'

interface DeleteServiceUseCaseRequest {
  serviceId: string
}

interface DeleteServiceUseCaseResponse {
  service: Service
}

export class DeleteServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    serviceId,
  }: DeleteServiceUseCaseRequest): Promise<DeleteServiceUseCaseResponse> {
    const service = await this.servicesRepository.findById(serviceId)

    if (!service) throw new AppError('Service not found.')

    await this.servicesRepository.delete(service)

    return { service }
  }
}
