import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/user';
import UsersRepository from '../infra/typeorm/repositories/usersRepository';

interface IRequest {
  id: string;
}

class ShowProfileService {
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User does not exist!');
    }

    return user;
  }
}

export default ShowProfileService;
