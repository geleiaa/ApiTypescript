import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceApp = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [
    './src/modules/users/entities/User.ts',
    './src/modules/users/entities/Token.ts',
    './src/modules/products/entities/Product.ts',
    './src/modules/orders/entities/Order.ts',
    './src/modules/orders/entities/OrdersProducts.ts',
  ],
  migrations: ['./src/shared/database/migrations/*.ts'],
});

dataSourceApp
  .initialize()
  .then(() => console.log('Database Connected!!'))
  .catch(err => console.log(err));
