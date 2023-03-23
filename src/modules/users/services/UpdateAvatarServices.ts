import AppError from '@shared/errors/AppError';
import User from '../infra/entities/User';
import { UsersRepository } from '../infra/repositories/UsersRepost';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProveder';

interface IRequest {
  userId: string;
  avatarFile: string;
}

class UpdateAvatarService {
  public async execute({ userId, avatarFile }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(userId);
    const storageProvider = new DiskStorageProvider();

    if (!user) {
      throw new AppError('Não achei o usuário!!!');
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);
    }

    const filename = await storageProvider.saveFile(avatarFile);

    user.avatar = filename;

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
