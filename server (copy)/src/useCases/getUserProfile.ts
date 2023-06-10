import { AppError } from '@/http/controllers/errors'
import { UsersRepository } from '@/repositories/usersRepository'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Resource not found.', 404)

    return { user }
  }
}
