import OrdersProducts from '@modules/orders/infra/entities/OrdersProducts';

export interface IProds {
  id: string;
  name: string;
  price: number;
  quantity: number;
  order_products: OrdersProducts[];
  created_at: Date;
  updated_at: Date;
}
