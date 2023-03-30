import { inject, injectable } from 'tsyringe';
import { IPagination } from '../domain/models/IPagination';
import { IUsersRepository } from '../domain/models/IUsersRepository';

@injectable()
class UserListService {
  constructor(
    @inject('UsersRepository')
    private userRepo: IUsersRepository,
  ) {}

  public async execute(page: number, limit: number): Promise<IPagination> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const users = await this.userRepo.findAll(page, skip, take);

    return users;
  }
}

export default UserListService;
