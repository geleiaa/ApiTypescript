import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import { dataSourceApp } from '@shared/infra/database';

dataSourceApp
  .initialize()
  .then(() => console.log('Database Connected!!'))
  .catch(err => console.log(err));

const port = process.env.PORT;
export const server = app.listen(port, () => {
  console.log(`Server started in port ${port}...`);
});
