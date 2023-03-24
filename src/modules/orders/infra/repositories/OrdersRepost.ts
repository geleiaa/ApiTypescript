import { IOrdersRepository } from '@modules/orders/domain/models/IOrdersRepository';
import { dataSourceApp } from '@shared/infra/database';
import { Repository } from 'typeorm';
import Order from '../entities/Order';
import User from '@modules/users/infra/entities/User';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  user: User;
  products: IProduct[];
}
//export const OrdersRepository = dataSourceApp.getRepository(Order).extend;
class OrdersRepository implements IOrdersRepository {
  private ormRepo: Repository<Order>;

  constructor() {
    this.ormRepo = dataSourceApp.getRepository(Order);
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.ormRepo.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        order_products: true,
      },
    });

    return order;
  }

  async createOrder({ user, products }: IRequest): Promise<Order> {
    const order = this.ormRepo.create({
      user,
      order_products: products,
    });

    await this.ormRepo.save(order);

    return order;
  }

  //async save()
}

export default OrdersRepository;
