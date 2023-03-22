import nodemailer from 'nodemailer';
import { handlebarsMailTemplate } from './MailTemplate';
import mailConf from '@config/mail/mail';

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

export class SendOtherServiceMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new handlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      // config of other email service
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || mailConf.defaults.from.name,
        address: from?.email || mailConf.defaults.from.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
