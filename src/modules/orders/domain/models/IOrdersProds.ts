import { IOrders } from './IOrders';
import { IProds } from '@modules/products/domain/models/IProds';

export interface IOrdersProds {
  id: string;
  price: number;
  quatity: number;
  order: IOrders;
  product: IProds;
  created_at: Date;
  updated_at: Date;
}
