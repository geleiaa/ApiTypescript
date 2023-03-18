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

    const quantityAvailable = products.filter(
      product =>
        prodsExists.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    ); // a - 93

    if (quantityAvailable.length) {
      throw new AppError(
        `A quantidade ${quantityAvailable[0].quantity} é maior do que a quantidade do produto ${quantityAvailable[0].id} disponivel .`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: prodsExists.filter(p => p.id === product.id)[0].price,
    })); // a - 94

    const order = await OrdersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        prodsExists.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    })); // a - 95

    await ProdsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default OrderCreateService;
