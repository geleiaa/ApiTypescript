import Order from '../infra/entities/Order';
import AppError from '@shared/errors/AppError';
import { IOrdersRepository } from '../domain/models/IOrdersRepository';

interface IRequest {
  id: string;
}

class OrderShowService {
  constructor(private ordersRepo: IOrdersRepository) {}

  async execute({ id }: IRequest): Promise<Order> {
    const order = await this.ordersRepo.findById(id);

    if (!order) {
      throw new AppError('Order não encontrada!!');
    }

    return order;
  }
}

export default OrderShowService;
