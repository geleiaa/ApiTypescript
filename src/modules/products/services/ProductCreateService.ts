import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import Product from '../infra/entities/Product';
import { ProdsRepository } from '../infra/repositories/ProductRepost';

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

    const product = ProdsRepository.create({
      name,
      price,
      quantity,
    });

    await RedisCache.invalidateCache('api-vendas-PRODUCT_LIST');

    await ProdsRepository.save(product);

    return product;
  }
}

export default ProductCreateService;
