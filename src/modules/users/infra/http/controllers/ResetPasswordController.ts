import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordEmailService from '../../../services/ResetPasswordService';

export class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPass = container.resolve(ResetPasswordEmailService);

    await resetPass.execute({
      token,
      password,
    });

    console.log('Reseted Pass');

    return res.status(200).json({
      message: 'Senha Atualizada!!',
    });
  }
}
