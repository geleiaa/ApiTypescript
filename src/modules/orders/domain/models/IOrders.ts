import OrdersProducts from '@modules/orders/infra/entities/OrdersProducts';
import User from '@modules/users/infra/entities/User';
//import { IUsers } from '@modules/users/domain/models/IUsers';
//import { IOrdersProds } from './IOrdersProds';

export interface IOrders {
  id: string;
  user: User;
  order_products: OrdersProducts[];
  created_at: Date;
  updated_at: Date;
}
