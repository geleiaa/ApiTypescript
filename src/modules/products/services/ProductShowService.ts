import AppError from '@shared/errors/AppError';
import { IProds } from '../domain/models/IProds';
import { IProdsRepository } from '../domain/models/IProdsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
class ProductShowService {
  constructor(
    @inject('ProdsRepository')
    private prodsRepo: IProdsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IProds> {
    const product = await this.prodsRepo.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado!!!');
    }

    return product;
  }
}

export default ProductShowService;
