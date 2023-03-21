import Product from '../entities/Product';
import { ProdsRepository } from '../repositories/ProductRepost';
import RedisCache from '@shared/cache/RedisCache';

// interface IPagenate {
//   from: number;
//   to: number;
//   per_page: number;
//   total: number;
//   current_page: number;
//   prev_page: number | null;
//   next_page: number | null;
//   last_page: number;
//   data: Product[];
// }

class ProductListService {
  public async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recoverCache<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await ProdsRepository.find();

      await redisCache.saveCache('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ProductListService;
