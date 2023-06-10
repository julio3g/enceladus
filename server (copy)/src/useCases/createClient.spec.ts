import { InMemoryClientsRepository } from '@/repositories/inMemory/InMemoryClientsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateClientUseCase } from './createClient'

let clientsRepository: InMemoryClientsRepository
let sut: CreateClientUseCase

describe('Create Client Use Case', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new CreateClientUseCase(clientsRepository)
  })

  it('should to create client', async () => {
    const { client } = await sut.execute({
      name: 'Client example',
      phone: '(49)99145-0440',
      contact: 'Client example',
      balance: 1000,
      created_at: new Date(),
    })

    expect(client.id).toEqual(expect.any(String))
  })
})
