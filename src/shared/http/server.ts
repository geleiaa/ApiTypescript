import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import '@shared/database';

const app = express();

app.use(cors());
app.use(express.json());

//app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error ',
  });
});

const port = 1234;
app.listen(port, () => {
  console.log(`Server started in port ${port}...`);
});
