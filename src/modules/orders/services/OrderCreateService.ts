import { IOrdersRepository } from '../domain/models/IOrdersRepository';
import { IProdsRepository } from '@modules/products/domain/models/IProdsRepository';
import { IUsersRepository } from '@modules/users/domain/models/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Order from '../infra/entities/Order';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  user_id: string;
  products: IProduct[];
}

class OrderCreateService {
  constructor(
    private ordersRepo: IOrdersRepository,
    private usersRepo: IUsersRepository,
    private prodsRepo: IProdsRepository,
  ) {}

  public async execute({ user_id, products }: IRequest): Promise<Order> {
    const userExists = await this.usersRepo.findById(user_id);

    if (!userExists) {
      throw new AppError('Esse Cliente não existe!!!');
    }

    const prodsExists = await this.prodsRepo.findAllById(products);

    if (!prodsExists.length) {
      throw new AppError('Produtos não encontrados!');
    }

    const existsProductsIds = prodsExists.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    ); // separa ids não encontrados em existsProductsIds

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Não foi possivel achar o produto ${checkInexistentProducts[0].id}.`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        prodsExists.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    ); // verifica se a quantidade comprada é maior q a quantidade do estoque

    if (quantityAvailable.length) {
      throw new AppError(
        `A quantidade ${quantityAvailable[0].quantity} é maior do que a quantidade disponivel do produto ${quantityAvailable[0].id} .`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: prodsExists.filter(p => p.id === product.id)[0].price,
    })); // a - 94

    const order = await this.ordersRepo.createOrder({
      user: userExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        prodsExists.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    })); // a - 95

    await this.prodsRepo.updateEstoque(updatedProductQuantity);

    return order;
  }
}

export default OrderCreateService;
