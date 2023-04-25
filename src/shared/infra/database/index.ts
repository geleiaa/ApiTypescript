import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import User from '@modules/users/infra/entities/User';
import Product from '@modules/products/infra/entities/Product';
import Order from '@modules/orders/infra/entities/Order';
import UserToken from '@modules/users/infra/entities/Token';
import OrdersProducts from '@modules/orders/infra/entities/OrdersProducts';

// Database Connection
export const dataSourceApp = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, UserToken , Product, Order, OrdersProducts],
  migrations: ['./src/shared/infra/database/migrations/*.ts'],
});

//CONFIG PARA PÓS BUILD
// entities: ['./src/modules/**/entities/*.js'],
// migrations: ['./src/shared/database/migrations/*.js'],
//)};
