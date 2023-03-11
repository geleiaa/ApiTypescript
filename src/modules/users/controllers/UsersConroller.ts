import { Request, Response } from 'express';
import UserCreateService from '../services/UserCreateService';
import UserListService from '../services/UserListService';

export class UserController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listUsers = new UserListService();

    const users = await listUsers.execute();

    return res.json({
      data: users,
    });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createOne = new UserCreateService();

    const user = createOne.execute({ name, email, password });

    return res.json({
      message: 'usuário criado!!',
      data: user,
    });
  }
}
