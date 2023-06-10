import { InMemoryRecipientsRepository } from '@/repositories/inMemory/InMemoryReceiptsRepository'
import { randomInt } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateReceiptUseCase } from './createReceipt'

let receiptRepository: InMemoryRecipientsRepository
let sut: CreateReceiptUseCase

describe('Create Receipt Use Case', () => {
  beforeEach(() => {
    receiptRepository = new InMemoryRecipientsRepository()
    sut = new CreateReceiptUseCase(receiptRepository)
  })

  it('should to create receipt', async () => {
    const { receipt } = await sut.execute({
      description: 'receipt example',
      value: randomInt(0, 10000),
    })

    expect(receipt.id).toEqual(expect.any(String))
  })
})
