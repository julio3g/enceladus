import { InMemoryRecipientsRepository } from '@/repositories/inMemory/InMemoryReceiptsRepository'
import { ListReceiptsByClientUseCase } from './listReceiptsByClient'

let receiptsRepository: InMemoryRecipientsRepository
let sut: ListReceiptsByClientUseCase

describe('List Clients', () => {
  beforeEach(() => {
    receiptsRepository = new InMemoryRecipientsRepository()
    sut = new ListReceiptsByClientUseCase(receiptsRepository)
  })

  it('should be able to list receipts by clients', async () => {
    await receiptsRepository.create({
      description: 'description-1',
      value: 1,
      client_id: 'client-1',
    })

    await receiptsRepository.create({
      description: 'description-2',
      value: 1,
      client_id: 'client-1',
    })

    const { receipts } = await sut.execute({
      clientId: 'client-1',
    })

    expect(receipts).toHaveLength(2)
    expect(receipts).toEqual([
      expect.objectContaining({ description: 'description-1' }),
      expect.objectContaining({ description: 'description-2' }),
    ])
  })
})
