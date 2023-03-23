import AppError from '@shared/errors/AppError';
import authConf from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import 'dotenv/config';

interface ITokenPayload {
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
    const verifyToken = verify(token, authConf.jwt.secret as Secret);

    const { id } = verifyToken as ITokenPayload;

    req.user = {
      id: id,
    };

    return next();
  } catch (error) {
    throw new AppError('Token Invalido!!!');
  }
};
// middleware que verifica o token no header das reqs
