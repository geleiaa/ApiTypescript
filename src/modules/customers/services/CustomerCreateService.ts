import Customer from '../entitites/Customer';
import { CustomersRepository } from '../repositories/CustomersRepost';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
}

class CustomerCreateService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const emailExists = await CustomersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Esta email ja esta em uso!!');
    }

    const customer = CustomersRepository.create({
      name,
      email,
    });

    await CustomersRepository.save(customer);

    return customer;
  }
}

export default CustomerCreateService;
