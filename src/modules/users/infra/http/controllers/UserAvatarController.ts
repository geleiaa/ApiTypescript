import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAvatarService from '../../../services/UpdateAvatarServices';

export class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateAvatarService);

    const user = await updateAvatar.execute({
      userId: req.user.id,
      avatarFile: req.file?.filename as string,
    });

    return res.json({
      message: 'avatar enviado!!',
      user: user,
    });
  }
}
