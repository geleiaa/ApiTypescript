import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import '@shared/infra/database';
import routes from './routes';
import { errors } from 'celebrate';
import uploadConf from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';
//import { pagination } from 'typeorm-pagination';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/files', express.static(uploadConf.directory));
app.use(routes);

//app.use(pagination);

app.use(errors()); // 'celebrate' validation errors

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error ',
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started in port ${port}...`);
});
