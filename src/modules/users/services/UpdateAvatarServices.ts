import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import User from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepost';
import uploadConf from '@config/upload';

interface IRequest {
  userId: string;
  avatarFile: string;
}

class UpdateAvatarService {
  public async execute({ userId, avatarFile }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(userId);

    if (!user) {
      throw new AppError('Não achei o usuário!!!');
    }

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConf.directory, user.avatar);
      const avatarExists = await fs.promises.stat(avatarFilePath);

      if (avatarExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    user.avatar = avatarFile;

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
