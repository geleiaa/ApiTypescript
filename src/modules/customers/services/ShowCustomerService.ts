import Customer from '../entities/Customer';
import { CustomersRepository } from '../repositories/CustomersRepost';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado!!!');
    }

    return customer;
  }
}

export default ShowCustomerService;
