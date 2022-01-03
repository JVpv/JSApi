import { ICreatedUser } from '../models/iCreatedUser';
import { IUser } from '../models/iUser';

export default interface IUsersRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(user: ICreatedUser): Promise<IUser>;
}
