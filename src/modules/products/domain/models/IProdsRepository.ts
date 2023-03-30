import { IPagination } from './IPagination';
import { IProds } from './IProds';
import { IProdsCreate } from './IProdsCreate';
import { IUpdateEstoque } from './IUpdateEstoque';

export interface IProdsRepository {
  findByName(name: string): Promise<IProds | null>;
  findAllById(product: unknown[]): Promise<IProds[]>;
  findAll(page: number, skip: number, take: number): Promise<IPagination>;
  findById(id: string): Promise<IProds | null>;
  updateEstoque(product: IUpdateEstoque[]): Promise<void>;
  create(data: IProdsCreate): Promise<IProds>;
  save(product: IProds): Promise<IProds>;
  remove(product: IProds): Promise<void>;
}
