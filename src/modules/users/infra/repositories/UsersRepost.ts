import { dataSourceApp } from '@shared/infra/database';
import User from '../entities/User';

export const UsersRepository = dataSourceApp.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  },

  async findById(id: string): Promise<User | null> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({
      select: ['id', 'name', 'email', 'password'],
      where: {
        email,
      },
    });

    return user;
  },
});
