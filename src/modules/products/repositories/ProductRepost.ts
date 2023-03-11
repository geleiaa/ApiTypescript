//import 'reflect-metadata';
import { dataSourceApp } from '@shared/database';
import Product from '../entities/Product';

export const ProdsRepository = dataSourceApp.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  },
});
