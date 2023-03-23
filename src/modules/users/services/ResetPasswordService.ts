import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../infra/repositories/UsersRepost';
import { UsersTokenRepository } from '../infra/repositories/UserTokensRepost';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordEmailService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await UsersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token não encontrado!!!');
    }

    const user = await UsersRepository.findById(userToken.user_id);

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

    await UsersRepository.save(user);
  }
}

export default ResetPasswordEmailService;
