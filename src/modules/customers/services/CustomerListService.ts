import Customer from '../entitites/Customer';
import { CustomersRepository } from '../repositories/CustomersRepost';
import AppError from '@shared/errors/AppError';

class CustomerListService {
  public async execute(): Promise<Customer[]> {
    const customers = await CustomersRepository.find();

    return customers;
  }
}

export default CustomerListService;
