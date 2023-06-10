import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { ListUsersUseCase } from './listUsers'

let usersRepository: InMemoryUsersRepository
let sut: ListUsersUseCase

describe('List Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ListUsersUseCase(usersRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await usersRepository.create({
      name: 'name-1',
      email: 'john@example.com',
      password_hash: await hash('456789', 6),
    })
    await usersRepository.create({
      name: 'name-2',
      email: 'ner@janzupe.ht',
      password_hash: await hash('123456', 6),
    })

    const { users } = await sut.execute()

    expect(users).toHaveLength(2)
    expect(users).toEqual([
      expect.objectContaining({ name: 'name-1' }),
      expect.objectContaining({ name: 'name-2' }),
    ])
  })
})
