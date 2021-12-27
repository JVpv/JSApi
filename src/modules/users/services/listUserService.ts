import { getCustomRepository } from 'typeorm';
import user from '../infra/typeorm/entities/user';
import UsersRepository from '../infra/typeorm/repositories/usersRepository';

class ListUserService {
  public async execute(): Promise<user[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
