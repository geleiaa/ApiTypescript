import { dataSourceApp } from '@shared/database';
import { In } from 'typeorm';
import Product from '../entities/Product';

interface IFindProds {
  id: string;
}

export const ProdsRepository = dataSourceApp.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  },

  async findAllById(product: IFindProds[]): Promise<Product[]> {
    const productsIds = product.map(prods => prods.id);

    const products = await this.find({
      where: {
        id: In(productsIds),
      },
    });

    return products;
  },
});
