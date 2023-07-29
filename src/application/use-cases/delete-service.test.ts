import { InMemoryServicesRepository } from '../../../test/repositories/in-memory-services-repository'
import { Service } from '../entities/Service'
import { DeleteService } from './delete-service'

test('delete service', async () => {
  const inMemoryServicesRepository = new InMemoryServicesRepository()
  inMemoryServicesRepository.create(new Service({
    name: 'cleanning'
  },
    '***'
  ))
  const deleteService = new DeleteService(inMemoryServicesRepository)
  await deleteService.execute({ serviceId: '***' })

  expect(inMemoryServicesRepository.services.length).toEqual(0)
})