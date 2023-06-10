import { AppError } from '@/http/controllers/errors'
import { UsersRepository } from '@/repositories/usersRepository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

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

    if (!user) throw new AppError('Invalid credentials.', 409)

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) throw new AppError('Invalid credentials.', 409)

    return { user }
  }
}
