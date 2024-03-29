import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import '@shared/infra/database';
import '@shared/containerDI/index';
import routes from './routes';
import uploadConf from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';
import express, { NextFunction, Request, Response } from 'express';
//import { pagination } from 'typeorm-pagination';
import swaggerUi from 'swagger-ui-express';
import apiFile from  './swagger.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/files', express.static(uploadConf.directory));
app.use(routes);

//app.use(pagination);

app.use(errors()); // 'celebrate' validation errors

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiFile));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  //console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error ',
  });
});

export default app;
