import { Request, Response } from 'express';
import ProductCreateService from '../../../services/ProductCreateService';
import ProductDeleteService from '../../../services/ProductDeleteSevice';
import ProductListService from '../../../services/ProductListService';
import ProductShowService from '../../../services/ProductShowService';
import ProductUpdateService from '../../../services/ProductUpdateService';
import { container } from 'tsyringe';

export class ProductsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listProd = container.resolve(ProductListService);

    const page = req.params.page ? Number(req.params.page) : 1;
    const limit = req.params.limit ? Number(req.params.limit) : 10;

    const products = await listProd.execute(page, limit);

    return res.status(200).json({
      data: products,
    });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOne = container.resolve(ProductShowService);

    const product = await showOne.execute({ id });

    return res.json({
      data: product,
    });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createOne = container.resolve(ProductCreateService);

    const product = await createOne.execute({ name, price, quantity });

    return res.json({
      message: 'produto criado',
      data: product,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateOne = container.resolve(ProductUpdateService);

    const product = await updateOne.execute({ id, name, price, quantity });

    return res.json({
      message: 'produto atualizado',
      data: product,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteOne = container.resolve(ProductDeleteService);

    await deleteOne.execute({ id });

    return res.json({
      message: 'produto removido',
    });
  }
}
