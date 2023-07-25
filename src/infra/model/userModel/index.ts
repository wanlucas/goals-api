import User from '../../../domain/entity/User';
import FindOne from './FindOne';
import Create from './Create';

class UserModel {
  constructor(
    public findOne: (id: string) => Promise<User>,
    public create: (user: User) => Promise<void>,
  ) { }
}

export default new UserModel(
  FindOne.execute,
  Create.execute,
);