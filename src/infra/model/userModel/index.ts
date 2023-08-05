import User from '../../../domain/entity/User';
import FindById from './FindById';
import FindOne from './FindOne';
import Create from './Create';
import { QueryOptions } from '../../interface';

class UserModel {
  constructor(
    public findById: (id: string) => Promise<User | undefined>,
    public findOne: (builder?: QueryOptions) => Promise<User | undefined>,
    public create: (user: User) => Promise<void>,
  ) { }
}

export default new UserModel(
  FindById.execute,
  FindOne.execute,
  Create.execute,
);