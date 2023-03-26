import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendFogotPasswordEmailService from '../../../services/ForgotPasswordService';

export class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendEmail = container.resolve(SendFogotPasswordEmailService);

    await sendEmail.execute({
      email,
    });

    return res.status(200).json({
      messge: 'Email Enviado',
    });
  }
}
