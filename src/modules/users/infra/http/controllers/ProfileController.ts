import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';

export class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);

    const user_id = req.user.id;

    const user = await showProfile.execute({ user_id });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const updateProfile = container.resolve(UpdateProfileService);

    const user_id = req.user.id;
    const { name, email, password, old_pass } = req.body;

    const profile = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_pass,
    });

    return res.status(200).json({
      message: 'perfil atualizado',
      user: profile,
    });
  }
}
