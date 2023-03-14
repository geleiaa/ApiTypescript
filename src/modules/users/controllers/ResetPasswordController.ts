import { Request, Response } from 'express';
import ResetPasswordEmailService from '../services/ResetPasswordService';

export class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPass = new ResetPasswordEmailService();

    await resetPass.execute({
      token,
      password,
    });

    console.log('Reseted Pass');

    return res.status(204);
  }
}
