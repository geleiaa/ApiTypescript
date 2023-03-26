import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IProdsRepository } from '../domain/models/IProdsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
class ProductDeleteService {
  constructor(
    @inject('ProdsRepository')
    private prodsRepo: IProdsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.prodsRepo.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado!!!');
    }

    await RedisCache.invalidateCache('api-vendas-PRODUCT_LIST');

    await this.prodsRepo.remove(product);
  }
}

export default ProductDeleteService;
