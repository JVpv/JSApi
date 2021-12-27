import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/user';
import UsersRepository from '../infra/typeorm/repositories/usersRepository';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const User = await usersRepository.findOne(id);

    if (!User) {
      throw new AppError('User does not exist!');
    }

    return User;
  }
}

export default ShowUserService;
