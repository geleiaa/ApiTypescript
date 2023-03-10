import AppError from '@shared/errors/AppError';
import { ProdsRepository } from '../repositories/ProductRepost';

interface IRequest {
  id: string;
}

class ProductDeleteService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await ProdsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new AppError('Produto não encontrado!!!');
    }

    await ProdsRepository.remove(product);
  }
}

export default ProductDeleteService;
