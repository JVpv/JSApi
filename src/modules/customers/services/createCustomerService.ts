import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/customer';
import CustomersRepository from '../typeorm/repositories/customersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('There is already an customer with this email!');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
