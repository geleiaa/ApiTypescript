import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { IUsers } from '../domain/models/IUsers';
import { IUsersRepository } from '../domain/models/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class UserCreateService {
  constructor(
    @inject('UsersRepository')
    private userRepo: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<IUsers> {
    const emailexists = await this.userRepo.findByEmail(email);

    if (emailexists) {
      throw new AppError('Esse email ja está cadastrado!!');
    }

    const hashedPass = await hash(password, 10); // hasheia a senha

    const user = this.userRepo.create({
      name,
      email,
      password: hashedPass,
    });

    return user;
  }
}

export default UserCreateService;
