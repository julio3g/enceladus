import { AppError } from '@/http/controllers/errors'
import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { AuthenticateUseCase } from '@/useCases/authenticate'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('Invalid credentials.', 409))
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toEqual(new AppError('Invalid credentials.', 409))
  })
})
