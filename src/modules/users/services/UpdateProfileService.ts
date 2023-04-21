import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { IUsers } from '../domain/models/IUsers';
import { IUsersRepository } from '../domain/models/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_pass: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepo: IUsersRepository,
  ) {}
  public async execute({
    user_id,
    name,
    email,
    password,
    old_pass,
  }: IRequest): Promise<IUsers> {
    const user = await this.userRepo.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!!');
    }

    const userEmail = await this.userRepo.findByEmail(email);

    if (userEmail && userEmail.id != user_id) {
      throw new AppError('Este email não pode ser usado!!');
    }

    if (password && !old_pass) {
      throw new AppError('Forneça a senha atual!!');
    }

    if (password && old_pass) {
      const checkOldPass = await compare(old_pass, user.password);
      console.log('=>', checkOldPass); // Erro no compare !!!

      if (!checkOldPass) {
        throw new AppError('A senha atual incorreta!!');
      }

      user.password = await hash(password, 10);
    }

    user.name = name;
    user.email = email;

    await this.userRepo.save(user);

    return user;
  }
}

export default UpdateProfileService;
