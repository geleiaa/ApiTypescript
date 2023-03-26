import { IUsersRepository } from '../domain/models/IUsersRepository';
import { IUsers } from '../domain/models/IUsers';
import { inject, injectable } from 'tsyringe';

@injectable()
class UserListService {
  constructor(
    @inject('UsersRepository')
    private userRepo: IUsersRepository,
  ) {}

  public async execute(page: number, limit: number): Promise<IUsers[]> {
    const skip = page;
    const take = limit;
    const users = await this.userRepo.findAll(skip, take);

    return users;
  }
}

export default UserListService;
