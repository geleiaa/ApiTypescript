import Product from '@modules/products/entities/Product';
import User from '@modules/users/entities/User';
import { DataSource } from 'typeorm';

export const dataSourceApp = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'geleia',
  password: 'senhageleia',
  database: 'apivendas',
  synchronize: true,
  logging: true,
  entities: [
    Product, User
    // './src/modules/products/entities/Product.ts',
    // './src/modules/users/entities/User.ts'
],
  migrations: ['./src/shared/database/migrations/*.ts'],
});

dataSourceApp
  .initialize()
  .then(() => console.log('Database Connected!!'))
  .catch(err => console.log(err));
