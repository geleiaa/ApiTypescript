import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SessionCreateService from '../../../services/SessionCreateService';

export class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = container.resolve(SessionCreateService);

    const user = await createSession.execute({
      email,
      password,
    });

    return res.json({
      message: 'você logou!!',
      data: user,
    });
  }
}
