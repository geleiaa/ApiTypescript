import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IProds } from '../domain/models/IProds';
import { IProdsCreate } from '../domain/models/IProdsCreate';
import { IProdsRepository } from '../domain/models/IProdsRepository';
import { inject, injectable } from 'tsyringe';

// interface IRequest {
//   name: string;
//   price: number;
//   quantity: number;
// }

@injectable()
class ProductCreateService {
  constructor(
    @inject('ProdsRepository')
    private prodsRepo: IProdsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: IProdsCreate): Promise<IProds> {
    const prodExists = await this.prodsRepo.findByName(name);

    if (prodExists) {
      throw new AppError('Esse produto ja existe!!!');
    }

    const product = this.prodsRepo.create({
      name,
      price,
      quantity,
    });

    await RedisCache.invalidateCache('api-vendas-PRODUCT_LIST');

    return product;
  }
}

export default ProductCreateService;
