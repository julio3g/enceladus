import { AppError } from '@/http/controllers/errors'
import { UsersRepository } from '@/repositories/usersRepository'

interface DeleteUserUseCaseRequest {
  userId: string
}

interface DeleteUserUseCaseResponse {}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('User not found.')

    if (user?.role !== 'ADMIN') throw new AppError('Not allowed.')

    await this.usersRepository.delete(user)

    return { user }
  }
}
