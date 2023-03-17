import Customer from '@modules/customers/entities/Customer';
import { dataSourceApp } from '@shared/database';
import Order from '../entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

export const OrdersRepository = dataSourceApp.getRepository(Order).extend({
  async findById(id: string): Promise<Order | null> {
    const order = await this.findOne({
      where: {
        id,
      },
      relations: {
        customer: true,
        order_products: true,
      },
    });

    return order;
  },

  async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  },
});
