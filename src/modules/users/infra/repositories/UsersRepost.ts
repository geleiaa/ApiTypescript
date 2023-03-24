import { IUsersRepository } from '@modules/users/domain/models/IUsersRepository';
import { dataSourceApp } from '@shared/infra/database';
import { Repository } from 'typeorm';
import User from '../entities/User';

//export const UsersRepository = dataSourceApp.getRepository(User).extend({
class UsersRepository implements IUsersRepository {
  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = dataSourceApp.getRepository(User);
  }

  async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepo.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.ormRepo.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepo.findOne({
      select: ['id', 'name', 'email', 'password'],
      where: {
        email,
      },
    });

    return user;
  }
}

export default UsersRepository;
