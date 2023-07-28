
import { InMemoryServicesRepository } from '../../../test/repositories/in-memory-services-repository'
import { Service } from '../entities/Service'
import { FindServices } from './find-services'

test('find services', async () => {
  const inMemoryServicesRepository = new InMemoryServicesRepository()

  inMemoryServicesRepository.create(new Service({ name: 'cleanning' }))
  inMemoryServicesRepository.create(new Service({ name: 'formating' }))

  const findServices = new FindServices(inMemoryServicesRepository)

  const { services } = await findServices.execute()

  expect(services).toHaveLength(2)
  expect(services.length).toEqual(inMemoryServicesRepository.services.length)
})