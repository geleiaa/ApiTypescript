//import AppError from "@shared/errors/AppError";
import Product from '../entities/Product';
import { ProdsRepository } from '../repositories/ProductRepost';

class ProductListService {
  public async execute(): Promise<Product[]> {
    const products = await ProdsRepository.find();

    return products;
  }
}

export default ProductListService;
