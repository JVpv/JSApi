import AppError from '@shared/errors/appError';
import { ICreateCustomer } from '../domain/models/iCreatedCustomer';
import ICustomersRepository from '../domain/repositories/iCustomersRepository';
import Customer from '../infra/typeorm/entities/customer';

class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('There is already an customer with this email!');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
