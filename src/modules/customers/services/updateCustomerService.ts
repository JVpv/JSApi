import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/customer';
import CustomersRepository from '../typeorm/repositories/customersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('customer does not exist!');
    }

    const customerUpdateEmail = await customersRepository.findByEmail(email);

    if (customerUpdateEmail && customerUpdateEmail.id != customer.id) {
      throw new AppError('There is already another user with this e-mail.');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
