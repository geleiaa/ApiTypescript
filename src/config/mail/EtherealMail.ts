import nodemailer from 'nodemailer';
import { handlebarsMailTemplate } from './MailTemplate';

interface IEMail {
  name: string;
  email: string;
}

interface ITemplateVars {
  [key: string]: string | number;
}

interface IMailTemplate {
  file: string;
  variables: ITemplateVars;
}

interface ISendMail {
  to: IEMail;
  from?: IEMail;
  subject: string;
  templateData: IMailTemplate;
}

export class SendEtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new handlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Geleia Api',
        address: from?.email || 'equipeapi@geleia.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
