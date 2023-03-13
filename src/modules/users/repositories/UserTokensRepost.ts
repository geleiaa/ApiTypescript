import { dataSourceApp } from '@shared/database';
import UserToken from '../entities/Token';

export const UsersTokenRepository = dataSourceApp
  .getRepository(UserToken)
  .extend({
    async findByToken(token: string): Promise<UserToken | null> {
      const userToken = await this.findOne({
        where: {
          token,
        },
      });

      return userToken;
    },

    async generate(user_id: string): Promise<UserToken | null> {
      const userToken = await this.create({
        user_id,
      });

      await this.save(userToken);

      return userToken;
    },
  });
