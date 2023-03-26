import { IUserCreate } from './IUserCreate';
import { IUsers } from './IUsers';

export interface IUsersRepository {
  findAll(skip: number, take: number): Promise<IUsers[]>;
  findByName(name: string): Promise<IUsers | null>;
  findById(id: string): Promise<IUsers | null>;
  findByEmail(email: string): Promise<IUsers | null>;
  create({ name, email, password }: IUserCreate): Promise<IUsers>;
  save(user: IUsers): Promise<IUsers>;
}
