import { dataSourceApp } from '@shared/database';
import Customer from '../entitites/Customer';

export const CustomersRepository = dataSourceApp
  .getRepository(Customer)
  .extend({
    async findById(id: string): Promise<Customer | null> {
      const customer = await this.findOne({
        where: {
          id,
        },
      });

      return customer;
    },

    async findByName(name: string): Promise<Customer | null> {
      const customer = await this.findOne({
        where: {
          name,
        },
      });

      return customer;
    },

    async findByEmail(email: string): Promise<Customer | null> {
      const customer = await this.findOne({
        where: {
          email,
        },
      });

      return customer;
    },
  });
