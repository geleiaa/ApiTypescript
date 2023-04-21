import { IPagination } from '@modules/users/domain/models/IPagination';
import { IUserCreate } from '@modules/users/domain/models/IUserCreate';
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

  async findAll(
    page: number,
    skip: number,
    take: number,
  ): Promise<IPagination> {
    const [users, count] = await this.ormRepo
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      users: users,
    };

    return result;
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

  async queryInDb(query: string): Promise<void> {
    await this.ormRepo.query(query);
  }
}

export default UsersRepository;
