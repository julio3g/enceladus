import { InMemoryClientsRepository } from '@/repositories/inMemory/InMemoryClientsRepository'
import { ListClientsUseCase } from './listClients'

let clientsRepository: InMemoryClientsRepository
let sut: ListClientsUseCase

describe('List Clients', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new ListClientsUseCase(clientsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await clientsRepository.create({
      name: 'name-1',
      contact: 'contact-1',
      balance: 1,
      phone: '49991450440',
    })
    await clientsRepository.create({
      name: 'name-2',
      contact: 'contact-2',
      phone: '49991450440',
      balance: 1,
    })

    const { clients } = await sut.execute()

    expect(clients).toHaveLength(2)
    expect(clients).toEqual([
      expect.objectContaining({ name: 'name-1' }),
      expect.objectContaining({ name: 'name-2' }),
    ])
  })
})
