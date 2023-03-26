import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import { IUsersRepository } from '../domain/models/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUserTokenRepository } from '../domain/models/IUserTokenRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepo: IUsersRepository,
    @inject('UserTokenRepost')
    private tokenRepo: IUserTokenRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.tokenRepo.findByToken(token);

    if (!userToken) {
      throw new AppError('Token não encontrado!!!');
    }

    const user = await this.userRepo.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!!!');
    }

    const tokenCreatedAt = userToken.created_at;

    // verirfica a quanto tempo o token foi emitido, expira em 2 hrs
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado!!');
    }

    user.password = await hash(password, 8);

    await this.userRepo.save(user);
  }
}

export default ResetPasswordEmailService;
