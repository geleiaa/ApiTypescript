import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../infra/repositories/UsersRepost';
import { UsersTokenRepository } from '../infra/repositories/UserTokensRepost';
import { SendEtherealMail } from '@config/mail/EtherealMail';
import path from 'path';
import mailConf from '@config/mail/mail';
import { SendOtherServiceMail } from '@config/mail/OtherEmailService';

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

    if (mailConf.driver === 'other email service') {
      await SendOtherServiceMail.sendMail({
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
      return;
    }

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
