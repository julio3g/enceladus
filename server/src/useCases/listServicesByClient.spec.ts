import { InMemoryServicesRepository } from '@/repositories/inMemory/InMemoryServicesRepository'
import { ListServicesByClientUseCase } from './listServicesByClient'

let servicesRepository: InMemoryServicesRepository
let sut: ListServicesByClientUseCase

describe('List Services by Client', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new ListServicesByClientUseCase(servicesRepository)
  })

  it('should be able to list services by clients', async () => {
    await servicesRepository.create({
      description: 'description-1',
      value: 1,
      client_id: 'client-1',
    })

    await servicesRepository.create({
      description: 'description-2',
      value: 1,
      client_id: 'client-1',
    })

    const { services } = await sut.execute({
      clientId: 'client-1',
    })

    expect(services).toHaveLength(2)
    expect(services).toEqual([
      expect.objectContaining({ description: 'description-1' }),
      expect.objectContaining({ description: 'description-2' }),
    ])
  })

  it('should be able to get balance from list of services by client', async () => {
    await servicesRepository.create({
      description: 'description-1',
      value: 5,
      client_id: 'client-1',
    })

    await servicesRepository.create({
      description: 'description-2',
      value: 5,
      client_id: 'client-1',
    })

    const { generalBalanceOfServices } = await sut.execute({
      clientId: 'client-1',
    })

    expect(generalBalanceOfServices).toEqual(10)
  })
})
