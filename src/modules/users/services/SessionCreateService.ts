import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign, Secret } from 'jsonwebtoken';
import authConf from '@config/auth';
import { IUsersRepository } from '../domain/models/IUsersRepository';
import { IUsers } from '../domain/models/IUsers';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUsers;
  token: string;
}

@injectable()
class SessionCreateService {
  constructor(
    @inject('UsersRepository')
    private userRepo: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou Senha incorreto!!!', 401);
    }

    const passConfirm = await compare(password, user.password);

    if (!passConfirm) {
      throw new AppError('Email ou Senha incorreto!!!', 401);
    }

    // emite o jwt
    const token = sign({ id: user.id }, authConf.jwt.secret as Secret, {
      expiresIn: authConf.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default SessionCreateService;
