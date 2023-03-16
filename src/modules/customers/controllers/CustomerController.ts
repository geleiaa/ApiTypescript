import { Request, Response } from 'express';
import CustomerCreateService from '../services/CustomerCreateService';
import CustomerListService from '../services/CustomerListService';
import CustomerDeleteService from '../services/CustomerDeleteService';
import ShowCustomerService from '../services/ShowCustomerService';
import CustomerUpdateService from '../services/CustomerUpdateSerivce';

export class CustomerController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listCustomers = new CustomerListService();

    const customers = await listCustomers.execute();

    return res.json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });

    return res.json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomer = new CustomerCreateService();

    const customer = await createCustomer.execute({ name, email });

    return res.status(201).json({
      message: 'cliente criado!',
      cliente: customer,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateCustomer = new CustomerUpdateService();

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return res.json({
      message: 'cliente atualizado!',
      cliente: customer,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCustomer = new CustomerDeleteService();

    await deleteCustomer.execute({ id });

    return res.json({ message: 'cliente removido!' });
  }
}
