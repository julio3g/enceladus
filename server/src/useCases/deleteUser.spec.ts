import { AppError } from '@/http/controllers/errors'
import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { expect } from 'vitest'
import { DeleteUserUseCase } from './deleteUser'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)
  })

  it('should be able to delete a user', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'ADMIN',
      password_hash: await hash('123456', 6),
    })

    expect(() => {
      return sut.execute({
        userId: usersRepository.items[0].id,
      })
    }).toHaveLength(0)
  })

  it('should not be able possible to delete a user not found', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'ADMIN',
      password_hash: await hash('123456', 6),
    })

    expect(() => {
      return sut.execute({
        userId: 'user-2',
      })
    }).rejects.toEqual(new AppError('User not found.'))
  })
})
