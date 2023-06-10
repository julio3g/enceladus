import { AppError } from '@/http/controllers/errors'
import { InMemoryClientsRepository } from '@/repositories/inMemory/InMemoryClientsRepository'
import { InMemoryExtrasRepository } from '@/repositories/inMemory/InMemoryExtrasRepository'
import { InMemoryRecipientsRepository } from '@/repositories/inMemory/InMemoryReceiptsRepository'
import { InMemoryServicesRepository } from '@/repositories/inMemory/InMemoryServicesRepository'
import { SetBalanceByClientUseCase } from './setBalanceByClient'

let clientsRepository: InMemoryClientsRepository
let servicesRepository: InMemoryServicesRepository
let extrasRepository: InMemoryExtrasRepository
let receiptsRepository: InMemoryRecipientsRepository
let sut: SetBalanceByClientUseCase

describe('Set Balance by Client', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    servicesRepository = new InMemoryServicesRepository()
    extrasRepository = new InMemoryExtrasRepository()
    receiptsRepository = new InMemoryRecipientsRepository()
    sut = new SetBalanceByClientUseCase(
      clientsRepository,
      servicesRepository,
      extrasRepository,
      receiptsRepository,
    )
  })

  it('should be able to set balance with extra, service and receipt by client', async () => {
    await clientsRepository.create({
      id: 'client-1',
      name: 'Samuel Maxwell',
      contact: 'Christine Dean',
      phone: '(873) 343-5781',
    })

    const service = await servicesRepository.create({
      description: 'description-1',
      value: 500,
      client_id: 'client-1',
    })

    const extra = await extrasRepository.create({
      description: 'description-2',
      value: 250,
      client_id: 'client-1',
    })

    const receipt = await receiptsRepository.create({
      description: 'description-2',
      value: 750,
      client_id: 'client-1',
    })

    const totalExpense = extra.value + service.value

    const generalBalance = totalExpense - receipt.value

    const { client } = await sut.execute({
      clientId: 'client-1',
    })

    client.balance! = generalBalance

    expect(client).toMatchObject({ balance: 0 })
    expect(generalBalance).toEqual(0)
  })

  it('should be able to set negative balance by client', async () => {
    await clientsRepository.create({
      id: 'client-1',
      name: 'Samuel Maxwell',
      contact: 'Christine Dean',
      phone: '(873) 343-5781',
    })

    const service = await servicesRepository.create({
      description: 'description-1',
      value: 500,
      client_id: 'client-1',
    })

    const extra = await extrasRepository.create({
      description: 'description-2',
      value: 250,
      client_id: 'client-1',
    })

    const receipt = await receiptsRepository.create({
      description: 'description-2',
      value: 500,
      client_id: 'client-1',
    })

    const totalExpense = extra.value + service.value

    const generalBalance = totalExpense - receipt.value

    const { client } = await sut.execute({
      clientId: 'client-1',
    })

    client.balance! = generalBalance

    expect(client).toMatchObject({ balance: 250 })
    expect(generalBalance).toEqual(250)
  })

  it('should be able to balance not found client', async () => {
    await clientsRepository.create({
      id: 'client-1',
      name: 'Samuel Maxwell',
      contact: 'Christine Dean',
      phone: '(873) 343-5781',
    })

    await servicesRepository.create({
      description: 'description-1',
      value: 500,
      client_id: 'client-1',
    })

    await extrasRepository.create({
      description: 'description-2',
      value: 250,
      client_id: 'client-1',
    })

    await receiptsRepository.create({
      description: 'description-2',
      value: 500,
      client_id: 'client-1',
    })

    expect(() => {
      return sut.execute({
        clientId: 'client-2',
      })
    }).rejects.toEqual(new AppError('Client not found', 404))
  })
})
