import { Request, Response } from 'express';
import OrderCreateService from '../services/OrderCreateService';
import OrderShowService from '../services/OrderShowService';

export class OrdersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showOrder = new OrderShowService();

    const { id } = req.params;

    const order = await showOrder.execute({ id });

    return res.status(200).json({
      order: order,
    });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const createOrder = new OrderCreateService();

    const { customer_id, products } = req.body;

    const order = await createOrder.execute({ customer_id, products });

    return res.status(201).json({
      message: 'order criado!',
      order: order,
    });
  }
}
