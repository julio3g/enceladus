import { AppError } from '@/http/controllers/errors'
import { ClientsRepository } from '@/repositories/clientsRepository'
import { ExtrasRepository } from '@/repositories/extrasRepository'
import { ReceiptsRepository } from '@/repositories/receiptsRepository'
import { ServicesRepository } from '@/repositories/servicesRepository'
import { sumListOfNumbers } from '@/utils/sumListOfNumbers'
import { Client } from '@prisma/client'

interface SetBalanceByClientUseCaseRequest {
  clientId: string
}

interface SetBalanceByClientUseCaseResponse {
  client: Client
}

export class SetBalanceByClientUseCase {
  constructor(
    private clientsRepository: ClientsRepository,
    private servicesRepository: ServicesRepository,
    private extrasRepository: ExtrasRepository,
    private receiptsRepository: ReceiptsRepository
  ) {}

  async execute({
    clientId,
  }: SetBalanceByClientUseCaseRequest): Promise<SetBalanceByClientUseCaseResponse> {
    const client = await this.clientsRepository.findById(clientId)

    if (!client) throw new AppError('Client not found', 404)

    const services = await this.servicesRepository.findManyByClientId(clientId)

    const totalService = sumListOfNumbers(services.map((s) => s.value))

    const extras = await this.extrasRepository.findManyByClientId(clientId)

    const totalExtra = sumListOfNumbers(extras.map((e) => e.value))

    const receipts = await this.receiptsRepository.findManyByClientId(clientId)

    const totalReceipt = sumListOfNumbers(receipts.map((r) => r.value))

    const totalExpenses = totalExtra + totalService

    const generalBalance = totalExpenses - totalReceipt

    client.balance! = generalBalance

    await this.clientsRepository.saveBalance(client)

    return { client }
  }
}
