import { DataSource } from 'typeorm';

export const ConnectionAppToDb = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'geleia',
  password: 'senhageleia',
  database: 'apivendas',
  synchronize: true,
  logging: true,
  migrations: ['./src/shared/database/migrations/*.ts'],
});

ConnectionAppToDb.initialize()
  .then(() => console.log('Database Connected!!'))
  .catch(err => console.log(err));
