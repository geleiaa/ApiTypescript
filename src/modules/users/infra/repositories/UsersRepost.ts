import { IUserCreate } from '@modules/users/domain/models/IUserCreate';
import { IUsers } from '@modules/users/domain/models/IUsers';
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

  async findAll(skip = 1, take = 10): Promise<IUsers[]> {
    const prods = await this.ormRepo
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getMany();

    return prods;
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

  async create({ name, email, password }: IUserCreate): Promise<User> {
    const user = this.ormRepo.create({ name, email, password });

    await this.ormRepo.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    await this.ormRepo.save(user);

    return user;
  }
}

export default UsersRepository;
