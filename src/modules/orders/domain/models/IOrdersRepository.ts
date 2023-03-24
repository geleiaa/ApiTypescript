import { IOrders } from './IOrders';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrders | null>;
  createOrder(data: unknown): Promise<IOrders>;
}
