import RedisCache from '@shared/cache/RedisCache';
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

    const redisCache = new RedisCache();

    const product = ProdsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidateCache('api-vendas-PRODUCT_LIST');

    await ProdsRepository.save(product);

    return product;
  }
}

export default ProductCreateService;
