import { DataSource } from 'typeorm';

export const dataSourceApp = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'geleia',
  password: 'senhageleia',
  database: 'apivendas',
  //synchronize: true,
  logging: true,
  entities: [
    './src/modules/users/entities/User.ts',
    './src/modules/users/entities/Token.ts',
    './src/modules/products/entities/Product.ts',
  ],
  migrations: ['./src/shared/database/migrations/*.ts'],
});

dataSourceApp
  .initialize()
  .then(() => console.log('Database Connected!!'))
  .catch(err => console.log(err));
