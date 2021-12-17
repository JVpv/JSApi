import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/userToken';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async findById(user_id: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        user_id,
      },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = await this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
