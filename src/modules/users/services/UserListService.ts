import User from '../infra/entities/User';
import { UsersRepository } from '../infra/repositories/UsersRepost';

class UserListService {
  public async execute(): Promise<User[]> {
    const users = await UsersRepository.find();

    return users;
  }
}

export default UserListService;
