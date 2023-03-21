import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../repositories/UsersRepost';
import { UsersTokenRepository } from '../repositories/UserTokensRepost';
import { SendEtherealMail } from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
  email: string;
}

class SendFogotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não existe!!!');
    }

    const { token } = await UsersTokenRepository.generate(user.id);

    // template do email
    const forgotTemplate = path.resolve(
      __dirname,
      '../../../config/mail/views/forgot_pass.hbs',
    );

    // https://ethereal.email/
    await SendEtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de Senha da Api',
      templateData: {
        file: forgotTemplate,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendFogotPasswordEmailService;
