import Order from '../entities/Order';
import { OrdersRepository } from '../repositories/OrdersRepost';
import { CustomersRepository } from '@modules/customers/repositories/CustomersRepost';
import { ProdsRepository } from '@modules/products/repositories/ProductRepost';
import AppError from '@shared/errors/AppError';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class OrderCreateService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await CustomersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Esse Cliente não existe!!!');
    }

    const prodsExists = await ProdsRepository.findAllById(products);

    if (!prodsExists.length) {
      throw new AppError('Produtos não encontrados!');
    }

    const existsProductsIds = prodsExists.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Não foi possivel achar o produto ${checkInexistentProducts[0].id}.`,
      );
    }

    //...
  }
}

export default OrderCreateService;
