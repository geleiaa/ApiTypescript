import AppError from '@shared/errors/AppError';
import { IUsers } from '../domain/models/IUsers';
import { IUsersRepository } from '../domain/models/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepo: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IUsers> {
    const user = await this.userRepo.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!!');
    }

    return user;
  }
}

export default ShowProfileService;
