import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import User from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepost';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//     user: User;
// }

class SessionCreateService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou Senha incorreto!!!', 401);
    }

    const passConfirm = await compare(password, user.password);

    if (!passConfirm) {
      throw new AppError('Email ou Senha incorreto!!!', 401);
    }

    await UsersRepository.save(user);

    return user;
  }
}

export default SessionCreateService;
