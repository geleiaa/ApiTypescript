import { DataSource } from 'typeorm';
import 'dotenv/config';

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
  entities: ['./src/modules/**/infra/entities/*.ts'],
  migrations: ['./src/shared/infra/database/migrations/*.ts'],
});

dataSourceApp
  .initialize()
  .then(() => console.log('Database Connected!!'))
  .catch(err => console.log(err));

//CONFIG PARA PÓS BUILD
// entities: ['./src/modules/**/entities/*.js'],
// migrations: ['./src/shared/database/migrations/*.js'],
//)};
