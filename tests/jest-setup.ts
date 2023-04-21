import 'reflect-metadata';
import { dataSourceApp } from '../src/shared/infra/database';

//import 'dotenv/config';
//import { server } from '../src/shared/infra/http/server';

beforeAll(async () => {
  //const port = process.env.PORT;
  //server.listen(port, () => console.log('Init server for Test'));

  await dataSourceApp.initialize().then(() => console.log('Init DB for Test'));
});

afterAll(async () => {
  //server.close();

  dataSourceApp.destroy();
});
