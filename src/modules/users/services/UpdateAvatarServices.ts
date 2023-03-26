import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProveder';
import { inject, injectable } from 'tsyringe';
import { IUsers } from '../domain/models/IUsers';
import { IUsersRepository } from '../domain/models/IUsersRepository';

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepo: IUsersRepository,
  ) {}
  public async execute({ userId, avatarFile }: IRequest): Promise<IUsers> {
    const user = await this.userRepo.findById(userId);
    const storageProvider = new DiskStorageProvider();

    if (!user) {
      throw new AppError('Não achei o usuário!!!');
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);
    }

    const filename = await storageProvider.saveFile(avatarFile);

    user.avatar = filename;

    await this.userRepo.save(user);

    return user;
  }
}

export default UpdateAvatarService;
