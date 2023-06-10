import { AppError } from '@/http/controllers/errors'
import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { EditUserUseCase } from './editUser'

let usersRepository: InMemoryUsersRepository
let sut: EditUserUseCase

describe('Edit User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new EditUserUseCase(usersRepository)
  })

  it('should be able to edit a user', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await sut.execute({
      userId: 'user-1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      role: 'MEMBER',
    })

    expect(usersRepository.items[0]).toMatchObject({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      role: 'MEMBER',
    })
  })

  it('should not be able possible to edit a user not found', async () => {
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
        email: 'johndoe@example.com',
        name: 'John Doe',
        role: 'MEMBER',
      })
    }).rejects.toEqual(new AppError('User not found.'))
  })
})
