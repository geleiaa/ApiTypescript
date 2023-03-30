import 'reflect-metadata';
import 'dotenv/config';
import '@shared/infra/database';
import app from './app';

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started in port ${port}...`);
});
