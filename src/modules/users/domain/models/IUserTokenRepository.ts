import { IToken } from './IToken';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<IToken | null>;
  generate(user_id: string): Promise<IToken>;
}
