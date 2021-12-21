import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/customersRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer does not exist!');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
