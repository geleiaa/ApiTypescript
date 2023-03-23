import AppError from '@shared/errors/AppError';
import Product from '../infra/entities/Product';
import { ProdsRepository } from '../infra/repositories/ProductRepost';

interface IRequest {
  id: string;
}

class ProductShowService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await ProdsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new AppError('Produto não encontrado!!!');
    }

    return product;
  }
}

export default ProductShowService;
