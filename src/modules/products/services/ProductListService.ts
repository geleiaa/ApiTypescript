import Product from '../entities/Product';
import { ProdsRepository } from '../repositories/ProductRepost';

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
    const products = await ProdsRepository.find();

    return products;
  }
}

export default ProductListService;
