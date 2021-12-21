import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/customer';
import CustomersRepository from '../typeorm/repositories/customersRepository';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.find();

    return customers;
  }
}

export default ListCustomerService;
