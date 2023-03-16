import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '../repositories/CustomersRepost';

interface IRequest {
  id: string;
}

class CustomerDeleteService {
  public async execute({ id }: IRequest): Promise<void> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado!!!');
    }

    await CustomersRepository.remove(customer);
  }
}

export default CustomerDeleteService;
