import { InMemoryExtrasRepository } from '@/repositories/inMemory/InMemoryExtrasRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateExtraUseCase } from './createExtra'

let extrasRepository: InMemoryExtrasRepository
let sut: CreateExtraUseCase

describe('Create Extra Use Case', () => {
  beforeEach(() => {
    extrasRepository = new InMemoryExtrasRepository()
    sut = new CreateExtraUseCase(extrasRepository)
  })

  it('should to create extra', async () => {
    const { extra } = await sut.execute({
      description: 'extra example',
      value: 1000,
      client_id: 'client-id',
    })

    expect(extra.id).toEqual(expect.any(String))
  })
})
