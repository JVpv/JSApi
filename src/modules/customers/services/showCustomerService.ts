import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/customer';
import CustomersRepository from '../infra/typeorm/repositories/customersRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findOne(id);

    if (!customer) {
      throw new AppError('Customer does not exist!');
    }

    return customer;
  }
}

export default ShowCustomerService;
