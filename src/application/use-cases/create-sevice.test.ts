import { InMemoryServicesRepository } from '../../../test/repositories/in-memory-services-repository'
import { CreateSevice } from './create-service'

test('create service', async () => {
  const inMemoryServicesRepository = new InMemoryServicesRepository()
  const createService = new CreateSevice(inMemoryServicesRepository)
  const { service } = await createService.execute({ name: 'cleaning', description: 'component cleaning', price: 50 })
  
  expect(inMemoryServicesRepository.services).toHaveLength(1)
  expect(inMemoryServicesRepository.services[0]).toEqual(service)
})
