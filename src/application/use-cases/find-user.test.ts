import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository'
import { User } from '../entities/User'
import { FindUser } from './find-user'

describe('find user', () => {
  test('user not found', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const findUser = new FindUser(inMemoryUsersRepository)

    expect(findUser.execute({ userId: 'testId' })).rejects.toThrow('user not found')
  })

  test('user found', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    await inMemoryUsersRepository.create(new User({ email: 'johndoe@example.com', password: '***' }, 'testId'))
    const findUser = new FindUser(inMemoryUsersRepository)
    const { user } = await findUser.execute({ userId: 'testId' })

    expect(user.id).toEqual('testId')
    expect(user.email).toEqual('johndoe@example.com')
  })
})