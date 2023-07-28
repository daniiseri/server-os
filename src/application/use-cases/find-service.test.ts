import { InMemoryServicesRepository } from '../../../test/repositories/in-memory-services-repository'
import { Service } from '../entities/Service'
import { FindService } from './find-service'

describe('find service', () => {
  test('service not found', async () => {
    const inMemoryServicesRepository = new InMemoryServicesRepository()
    const findService = new FindService(inMemoryServicesRepository)

    expect(findService.execute({ serviceId: 'testId' })).rejects.toThrow('service not found')
  })

  test('service found', async () => {
    const inMemoryServicesRepository = new InMemoryServicesRepository()

    await inMemoryServicesRepository.create(new Service({ name: 'cleanning' }, 'testId'))

    const findService = new FindService(inMemoryServicesRepository)

    const { service } = await findService.execute({ serviceId: 'testId'})

    expect(service.id).toEqual('testId')
    expect(service.name).toEqual('cleanning')
  })
})