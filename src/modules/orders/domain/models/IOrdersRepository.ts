import { IOrders } from './IOrders';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrders | null>;
  //createOrder( /* Request */ ): Promise<IOrders>;
}
