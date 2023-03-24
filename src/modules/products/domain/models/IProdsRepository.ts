import { IProds } from './IProds';
import { IUpdateEstoque } from './IUpdateEstoque';

export interface IProdsRepository {
  findByName(name: string): Promise<IProds | null>;
  findAllById(product: unknown[]): Promise<IProds[]>;
  updateEstoque(product: IUpdateEstoque[]): Promise<void>;
}
