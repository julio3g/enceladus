import { UsersRepository } from '@/repositories/usersRepository'
import { User } from '@prisma/client'

interface ListUsersUseCaseResponse {
  users: User[]
}

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany()

    return { users }
  }
}
