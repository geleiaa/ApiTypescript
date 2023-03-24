import { IProdsRepository } from '@modules/products/domain/models/IProdsRepository';
import { IUpdateEstoque } from '@modules/products/domain/models/IUpdateEstoque';
import { dataSourceApp } from '@shared/infra/database';
import { In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProds {
  id: string;
}

//export const ProdsRepository = dataSourceApp.getRepository(Product).extend({
class ProdsRepository implements IProdsRepository {
  private ormRepo: Repository<Product>;

  constructor() {
    this.ormRepo = dataSourceApp.getRepository(Product);
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.ormRepo.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  async findAllById(product: IFindProds[]): Promise<Product[]> {
    const productsIds = product.map(prods => prods.id);

    const products = await this.ormRepo.find({
      where: {
        id: In(productsIds),
      },
    });

    return products;
  }

  async updateEstoque(product: IUpdateEstoque[]): Promise<void> {
    await this.ormRepo.save(product);
  }
}

export default ProdsRepository;
