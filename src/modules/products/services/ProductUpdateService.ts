import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import Product from '../infra/entities/Product';
import { ProdsRepository } from '../infra/repositories/ProductRepost';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class ProductUpdateService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await ProdsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new AppError('Produto não encontrado!!!');
    }

    const prodexists = await ProdsRepository.findByName(name);

    if (prodexists && name != product.name) {
      throw new AppError('Esse produto ja existe!!!');
    }

    await RedisCache.invalidateCache('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProdsRepository.save(product);

    return product;
  }
}

export default ProductUpdateService;
