import { User } from './User'

test('Invalid e-mail', () => {
  expect(() => new User({ name: 'John Doe', email: 'johndoe', password: '***' })).toThrow('Invalid e-mail')
})

test('user assignment', () => {
  const user = new User({ name: 'John Doe', email: 'johndoe@example.com', password: '***' })

  expect(user.email).toEqual('johndoe@example.com')
  expect(user.name).toEqual('John Doe')
  expect(user.password).toEqual('***')
  expect(user).toHaveProperty('createdAt')
  expect(user).toHaveProperty('_id')
})