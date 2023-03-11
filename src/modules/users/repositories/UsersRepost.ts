import { dataSourceApp } from '@shared/database';
import User from '../entities/User';

export const UsersRepository = dataSourceApp.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    const user = this.findOne({
      where: {
        name,
      },
    });

    return user;
  },

  async findById(id: string): Promise<User | null> {
    const user = this.findOne({
      where: {
        id,
      },
    });

    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    const user = this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
});
