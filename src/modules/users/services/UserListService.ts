import User from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepost';

class UserListService {
  public async execute(): Promise<User[]> {
    const users = await UsersRepository.find();

    return users;
  }
}

export default UserListService;
