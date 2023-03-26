import RedisCache from '@shared/cache/RedisCache';
import { IProds } from '../domain/models/IProds';
import { IProdsRepository } from '../domain/models/IProdsRepository';
import { inject, injectable } from 'tsyringe';

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

@injectable()
class ProductListService {
  constructor(
    @inject('ProdsRepository')
    private prodsRepo: IProdsRepository,
  ) {}

  public async execute(page: number, limit: number): Promise<IProds[]> {
    let products = await RedisCache.recoverCache<IProds[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      const skip = page;
      const take = limit;
      products = await this.prodsRepo.findAll(skip, take);

      await RedisCache.saveCache('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ProductListService;
