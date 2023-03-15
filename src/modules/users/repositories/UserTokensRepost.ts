import { dataSourceApp } from '@shared/database';
import Token from '../entities/Token';

export const UsersTokenRepository = dataSourceApp.getRepository(Token).extend({
  async findByToken(token: string): Promise<Token | null> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  },

  async generate(user_id: string): Promise<Token> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  },
});
