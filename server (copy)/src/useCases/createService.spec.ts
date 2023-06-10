import { InMemoryServicesRepository } from '@/repositories/inMemory/InMemoryServicesRepository'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateServiceUseCase } from './createService'

let servicesRepository: InMemoryServicesRepository
let sut: CreateServiceUseCase

describe('Create Service Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new CreateServiceUseCase(servicesRepository)
  })

  it('should to create service', async () => {
    const { service } = await sut.execute({
      description: 'Create description',
      value: 1000,
      client_id: randomUUID(),
      created_at: new Date(),
    })

    expect(service.id).toEqual(expect.any(String))
  })
})
