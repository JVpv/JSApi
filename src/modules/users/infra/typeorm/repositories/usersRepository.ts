import { ICreatedUser } from '@modules/users/domain/models/iCreatedUser';
import IUsersRepository from '@modules/users/domain/repositories/iUsersRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/user';

@EntityRepository(User)
export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create({ name, email, password }: ICreatedUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
