import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../repositories/UsersRepost';
import { UsersTokenRepository } from '../repositories/UserTokensRepost';

interface IRequest {
  email: string;
}

class SendFogotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não existe!!!');
    }

    const token = await UsersTokenRepository.generate(user.id);

    console.log(token);
  }
}

export default SendFogotPasswordEmailService;
