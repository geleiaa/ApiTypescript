import AppError from '@shared/errors/AppError';
import User from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepost';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!!');
    }

    return user;
  }
}

export default ShowProfileService;