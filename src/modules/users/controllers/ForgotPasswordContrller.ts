import { Request, Response } from 'express';
import SendFogotPasswordEmailService from '../services/ForgotPasswordService';

export class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendEmail = new SendFogotPasswordEmailService();

    await sendEmail.execute({
      email,
    });

    console.log('Email Enviado');

    return res.status(204);
  }
}
