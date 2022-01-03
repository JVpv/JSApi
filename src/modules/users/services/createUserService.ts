import AppError from '@shared/errors/appError';
import { hash } from 'bcryptjs';
import { inject } from 'tsyringe';
import { ICreatedUser } from '../domain/models/iCreatedUser';
import IUsersRepository from '../domain/repositories/iUsersRepository';
import User from '../infra/typeorm/entities/user';

class CreateUserService {
  constructor(
    @inject('CustomersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ name, email, password }: ICreatedUser): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('There is already an user with this email!');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
