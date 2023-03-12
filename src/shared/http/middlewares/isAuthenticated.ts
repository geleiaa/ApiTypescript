import AppError from '@shared/errors/AppError';
import authConf from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Não tem auth token!!!!');
  }

  const token = authHeader.split(' ')[1];

  try {
    const verifyToken = verify(token, authConf.jwt.secret);

    const { id } = verifyToken as TokenPayload;

    req.user = {
      id: id,
    };
    // {
    //   id: 'ddae3ed5-8d13-45b4-9b09-c0618549b1e6',
    //   iat: 1678646924,
    //   exp: 1678733324
    // }

    return next();
  } catch (error) {
    throw new AppError('Token Invalido!!!');
  }
};
