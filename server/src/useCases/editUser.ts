import { AppError } from '@/http/controllers/errors'
import { UsersRepository } from '@/repositories/usersRepository'
import { User } from '@prisma/client'

interface EditUserUseCaseRequest {
  userId: string
  name: string
  email: string
  role: 'ADMIN' | 'MEMBER'
}

interface EditUserUseCaseResponse {
  user: User
}

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    email,
    name,
    role,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('User not found.')

    user.name ?? name
    user.email ?? email
    user.role ?? role

    await this.usersRepository.save(user)

    return { user }
  }
}
