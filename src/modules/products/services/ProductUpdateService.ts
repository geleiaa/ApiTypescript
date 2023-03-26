import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IProds } from '../domain/models/IProds';
import { IProdsRepository } from '../domain/models/IProdsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class ProductUpdateService {
  constructor(
    @inject('ProdsRepository')
    private prodsRepo: IProdsRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<IProds> {
    const product = await this.prodsRepo.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado!!!');
    }

    const prodexists = await this.prodsRepo.findByName(name);

    if (prodexists && name != product.name) {
      throw new AppError('Esse produto ja existe!!!');
    }

    await RedisCache.invalidateCache('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.prodsRepo.save(product);

    return product;
  }
}

export default ProductUpdateService;
