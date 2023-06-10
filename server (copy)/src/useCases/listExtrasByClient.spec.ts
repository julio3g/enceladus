import { InMemoryExtrasRepository } from '@/repositories/inMemory/InMemoryExtrasRepository'
import { ListExtrasByClientUseCase } from './listExtrasByClient'

let extrasRepository: InMemoryExtrasRepository
let sut: ListExtrasByClientUseCase

describe('List Clients', () => {
  beforeEach(() => {
    extrasRepository = new InMemoryExtrasRepository()
    sut = new ListExtrasByClientUseCase(extrasRepository)
  })

  it('should be able to list extras by clients', async () => {
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
})
