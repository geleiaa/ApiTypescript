import { IProds } from '@modules/products/domain/models/IProds';
import { IProdsRepository } from '@modules/products/domain/models/IProdsRepository';
import { IUpdateEstoque } from '@modules/products/domain/models/IUpdateEstoque';
import { IProdsCreate } from '@modules/products/domain/models/IProdsCreate';
import { dataSourceApp } from '@shared/infra/database';
import { In, Repository } from 'typeorm';
import Product from '../entities/Product';
import { IPagination } from '@modules/products/domain/models/IPagination';

interface IFindProds {
  id: string;
}

//export const ProdsRepository = dataSourceApp.getRepository(Product).extend({
class ProdsRepository implements IProdsRepository {
  private ormRepo: Repository<Product>;

  constructor() {
    this.ormRepo = dataSourceApp.getRepository(Product);
  }

  async findAll(
    page: number,
    skip: number,
    take: number,
  ): Promise<IPagination> {
    const [prods, count] = await this.ormRepo
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: prods,
    };

    return result;
  }

  async findById(id: string): Promise<IProds | null> {
    const prod = await this.ormRepo.findOne({
      where: {
        id,
      },
    });

    return prod;
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

  async create({ name, price, quantity }: IProdsCreate): Promise<Product> {
    const prod = this.ormRepo.create({ name, price, quantity });

    await this.ormRepo.save(prod);

    return prod;
  }

  async save(product: IProds): Promise<Product> {
    await this.ormRepo.save(product);

    return product;
  }

  async remove(product: IProds): Promise<void> {
    await this.ormRepo.remove(product);
  }
}

export default ProdsRepository;
