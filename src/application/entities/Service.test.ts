import { Service } from './Service'

test('service assignment', () => {
  const service = new Service({ name: 'cleaning', description: 'component cleaning', price: 50 })

  expect(service.name).toEqual('cleaning')
  expect(service.description).toEqual('component cleaning')
  expect(service.price).toEqual(50)
})