import { IUserToken } from '../models/iUserToken';

export default interface IUserTokensRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;
  findById(user_id: string): Promise<IUserToken | undefined>;
  generate(user_id: string): Promise<IUserToken>;
}
