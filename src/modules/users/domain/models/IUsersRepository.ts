import { IUsers } from './IUsers';

export interface IUsersRepository {
  findByName(name: string): Promise<IUsers | null>;
  findById(id: string): Promise<IUsers | null>;
  findByEmail(email: string): Promise<IUsers | null>;
}
