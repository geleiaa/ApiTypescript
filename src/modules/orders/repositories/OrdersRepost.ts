import User from '@modules/users/entities/User';
import { dataSourceApp } from '@shared/database';
import Order from '../entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  user: User;
  products: IProduct[];
}

export const OrdersRepository = dataSourceApp.getRepository(Order).extend({
  async findById(id: string): Promise<Order | null> {
    const order = await this.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        order_products: true,
      },
    });

    return order;
  },

  async createOrder({ user, products }: IRequest): Promise<Order> {
    const order = this.create({
      user,
      order_products: products,
    });

    await this.save(order);

    return order;
  },
});
