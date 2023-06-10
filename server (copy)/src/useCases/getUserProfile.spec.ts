import { AppError } from '@/http/controllers/errors'
import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './getUserProfile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({ userId: 'non-existing-id' })
    ).rejects.toEqual(new AppError('Resource not found.', 404))
  })
})
