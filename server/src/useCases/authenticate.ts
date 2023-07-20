import { UsersRepository } from '@/repositories/usersRepository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email.toLowerCase())

    if (!user) throw new InvalidCredentialsError()

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) throw new InvalidCredentialsError()

    return { user }
  }
}
