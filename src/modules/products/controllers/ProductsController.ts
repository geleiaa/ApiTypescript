import { Request, Response } from 'express';
import ProductCreateService from '../services/ProductCreateService';
import ProductDeleteService from '../services/ProductDeleteSevice';
import ProductListService from '../services/ProductListService';
import ProductShowService from '../services/ProductShowService';
import ProductUpdateService from '../services/ProductUpdateService';

export class ProductsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listProd = new ProductListService();

    const products = await listProd.execute();

    return res.json({
      data: products,
    });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOne = new ProductShowService();

    const product = await showOne.execute({ id });

    return res.json({
      data: product,
    });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createOne = new ProductCreateService();

    const product = await createOne.execute({ name, price, quantity });

    return res.json({
      message: 'produto criado',
      data: product,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateOne = new ProductUpdateService();

    const product = await updateOne.execute({ id, name, price, quantity });

    return res.json({
      message: 'produto atualizado',
      data: product,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteOne = new ProductDeleteService();

    await deleteOne.execute({ id });

    return res.json({
      message: 'produto removido',
    });
  }
}
