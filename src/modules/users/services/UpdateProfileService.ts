import User from '../infra/entities/User';
import { UsersRepository } from '../infra/repositories/UsersRepost';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_pass: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_pass,
  }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!!');
    }

    const userEmail = await UsersRepository.findByEmail(email);

    if (userEmail && userEmail.id != user_id) {
      throw new AppError('Este email não pode ser usado!!');
    }

    if (password && !old_pass) {
      throw new AppError('Forneça a senha atual!!');
    }

    if (password && old_pass) {
      const checkOldPass = await compare(old_pass, user.password);

      if (!checkOldPass) {
        throw new AppError('A senha atual incorreta!!');
      }

      user.password = await hash(password, 10);
    }

    user.name = name;
    user.email = email;

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
