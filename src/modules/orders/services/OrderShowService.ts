import Order from '../infra/entities/Order';
import { OrdersRepository } from '../infra/repositories/OrdersRepost';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class OrderShowService {
  public async execute({ id }: IRequest): Promise<Order> {
    const order = await OrdersRepository.findById(id);

    if (!order) {
      throw new AppError('Order não encontrada!!');
    }

    return order;
  }
}

export default OrderShowService;
