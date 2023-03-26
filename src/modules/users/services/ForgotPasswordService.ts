import AppError from '@shared/errors/AppError';
import { SendEtherealMail } from '@config/mail/EtherealMail';
import path from 'path';
import mailConf from '@config/mail/mail';
import { SendOtherServiceMail } from '@config/mail/OtherEmailService';
import { IUsersRepository } from '../domain/models/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUserTokenRepository } from '../domain/models/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendFogotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepo: IUsersRepository,
    @inject('UserTokenRepost')
    private tokenRepo: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não existe!!!');
    }

    const { token } = await this.tokenRepo.generate(user.id);

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
