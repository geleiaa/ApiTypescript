import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';
import { ProdsRepository } from '../repositories/ProductRepost';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class ProductCreateService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const prodexists = await ProdsRepository.findByName(name);

    if (prodexists) {
      throw new AppError('Esse produto ja existe!!!');
    }

    const product = await ProdsRepository.create({
      name,
      price,
      quantity,
    });

    await ProdsRepository.save(product);

    return product;
  }
}

export default ProductCreateService;
