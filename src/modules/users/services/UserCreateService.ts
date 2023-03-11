import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import User from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepost';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class UserCreateService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailexists = await UsersRepository.findByEmail(email);

    if (emailexists) {
      throw new AppError('Esse email ja está cadastrado!!');
    }

    const hashedPass = await hash(password, 10); // hasheia a senha

    const user = await UsersRepository.create({
      name,
      email,
      password: hashedPass,
    });

    await UsersRepository.save(user);

    return user;
  }
}

export default UserCreateService;
