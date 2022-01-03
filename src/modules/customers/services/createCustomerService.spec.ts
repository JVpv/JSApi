import 'reflect-metadata';
import CreateCustomerService from './createCustomerService';
import FakeCustomersRepository from '../domain/repositories/fakes/fakeCustomersRepository';
import AppError from '@shared/errors/appError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });
  it('Should be able to create a new customer.', async () => {
    const customer = await createCustomer.execute({
      name: 'Cléber Vieira',
      email: 'cleber@teste.com',
    });

    expect(customer).toHaveProperty('id');
  });
  it('Should not be able to have two users with the same email', async () => {
    await createCustomer.execute({
      name: 'Cléber alves',
      email: 'cleber@teste.com',
    });

    expect(
      createCustomer.execute({
        name: 'Cléber alves',
        email: 'cleber@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
