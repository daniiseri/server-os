import { InMemoryServicesRepository } from '../../../test/repositories/in-memory-services-repository'
import { Service } from '../entities/Service'
import { UpdateService } from './update-service'

describe('update service', () => {
  test('valid service ID', async () => {
    const inMemoryServicesRepository = new InMemoryServicesRepository()

    const service = new Service({
      description: 'cleanning of PC',
      name: 'cleanning',
      price: 100
    },
      '***'
    )

    inMemoryServicesRepository.create(service)

    const updateService = new UpdateService(inMemoryServicesRepository)
    const { service: newService } = await updateService.execute({
      id: '***',
      description: 'formatting of PC',
      name: 'formatting',
      price: 400
    })

    expect(inMemoryServicesRepository.services[0]).toEqual(newService)
    expect(inMemoryServicesRepository.services[0].description).toEqual('formatting of PC')
    expect(inMemoryServicesRepository.services[0].price).toEqual(400)
  })
  test('invalid service ID', async () => {
    const inMemoryServicesRepository = new InMemoryServicesRepository()

    const updateService = new UpdateService(inMemoryServicesRepository)

    expect(updateService.execute({
      id: '***',
      description: 'formatting of PC',
      name: 'formatting',
      price: 400
    })).rejects.toThrow('invalid service ID')
  })
})