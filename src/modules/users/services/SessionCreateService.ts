import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepost';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class SessionCreateService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou Senha incorreto!!!', 401);
    }

    const passConfirm = await compare(password, user.password);

    if (!passConfirm) {
      throw new AppError('Email ou Senha incorreto!!!', 401);
    }

    const token = sign({ id: user.id }, 'secret', {
      // subject: user.id,
      expiresIn: '1d'
    })

    return {
      user,
      token
    }
  }
}

export default SessionCreateService;
