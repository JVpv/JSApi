import { container } from 'tsyringe';

import ICustomersRepository from '@modules/customers/domain/repositories/iCustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/customersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
