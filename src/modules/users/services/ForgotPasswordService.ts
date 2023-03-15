import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../repositories/UsersRepost';
import { UsersTokenRepository } from '../repositories/UserTokensRepost';
import { SendEtherealMail } from '@config/EtherealMail';

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

    await SendEtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinção de senha, <br /> cole este Token:${token?.token} no campo "token"`,
    });
  }
}

export default SendFogotPasswordEmailService;
