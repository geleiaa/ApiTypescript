import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserCreateService from '../../../services/UserCreateService';
import UserListService from '../../../services/UserListService';

export class UserController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(UserListService);

    const page = req.params.page ? Number(req.params.page) : 1;
    const limit = req.params.limit ? Number(req.params.limit) : 1;

    const users = await listUsers.execute(page, limit);

    return res.status(200).json({
      users: users,
    });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createOne = container.resolve(UserCreateService);

    const user = await createOne.execute({ name, email, password });

    return res.status(201).json({
      message: 'usuário criado!!',
      user: user,
    });
  }
}
