import { IToken } from '@modules/users/domain/models/IToken';
import { IUserTokenRepository } from '@modules/users/domain/models/IUserTokenRepository';
import { dataSourceApp } from '@shared/infra/database';
import { Repository } from 'typeorm';
import Token from '../entities/Token';

//export const UsersTokenRepository = dataSourceApp.getRepository(Token).extend({
class UsersTokenRepository implements IUserTokenRepository {
  private ormRepo: Repository<Token>;

  constructor() {
    this.ormRepo = dataSourceApp.getRepository(Token);
  }

  async findByToken(token: string): Promise<IToken | null> {
    const userToken = await this.ormRepo.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  async generate(user_id: string): Promise<Token> {
    const userToken = this.ormRepo.create({
      user_id,
    });

    await this.ormRepo.save(userToken);

    return userToken;
  }
}

export default UsersTokenRepository;
