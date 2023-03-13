import { Request, Response } from 'express';
import UpdateAvatarService from '../services/UpdateAvatarServices';

export class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateAvatarService();

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
