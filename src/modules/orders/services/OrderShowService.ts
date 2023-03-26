import { IOrders } from '../domain/models/IOrders';
import { IOrdersRepository } from '../domain/models/IOrdersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable() // classe injetavel
class OrderShowService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepo: IOrdersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<IOrders> {
    const order = await this.ordersRepo.findById(id);

    if (!order) {
      throw new AppError('Order não encontrada!!');
    }

    return order;
  }
}

export default OrderShowService;
