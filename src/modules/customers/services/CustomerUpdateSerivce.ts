import AppError from '@shared/errors/AppError';
import Customer from '../entitites/Customer';
import { CustomersRepository } from '../repositories/CustomersRepost';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) {
      throw new AppError('Não achei o cliente!!!');
    }

    const emailExists = await CustomersRepository.findByEmail(email);

    if (emailExists && email != customer.email) {
      throw new AppError('Esta email ja esta em uso!!');
    }

    customer.name = name;
    customer.email = email;

    await CustomersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
