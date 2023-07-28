import { CreateUser } from './create-user';
import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';

test('create user', async () => {
  const inMemoryUsersRepository = new InMemoryUsersRepository();
  const createUser = new CreateUser(inMemoryUsersRepository);

  const { user } = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '***' })

  expect(inMemoryUsersRepository.users).toHaveLength(1)
  expect(inMemoryUsersRepository.users[0]).toEqual(user)
})