import { InMemoryExtrasRepository } from '@/repositories/inMemory/InMemoryExtrasRepository'
import { ListExtrasByClientUseCase } from './listExtrasByClient'

let extrasRepository: InMemoryExtrasRepository
let sut: ListExtrasByClientUseCase

describe('List Extras By Clients', () => {
  beforeEach(() => {
    extrasRepository = new InMemoryExtrasRepository()
    sut = new ListExtrasByClientUseCase(extrasRepository)
  })

  it('should be able to list extras by client', async () => {
    await extrasRepository.create({
      description: 'description-1',
      value: 1,
      client_id: 'client-1',
    })

    await extrasRepository.create({
      description: 'description-2',
      value: 1,
      client_id: 'client-1',
    })

    const { extras } = await sut.execute({
      clientId: 'client-1',
    })

    expect(extras).toHaveLength(2)
    expect(extras).toEqual([
      expect.objectContaining({ description: 'description-1' }),
      expect.objectContaining({ description: 'description-2' }),
    ])
  })

  it('should be able to get balance from list of extras by client', async () => {
    await extrasRepository.create({
      description: 'description-1',
      value: 1,
      client_id: 'client-1',
    })

    await extrasRepository.create({
      description: 'description-2',
      value: 1,
      client_id: 'client-1',
    })

    const { generalBalanceOfExtras } = await sut.execute({
      clientId: 'client-1',
    })

    expect(generalBalanceOfExtras).toEqual(2)
  })
})
