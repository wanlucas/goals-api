import User from '../../entity/User';
import Create from './Create';
import FindOne from './FindOne';

class UserUseCase {
  constructor(
    public findOne: (id: string) => Promise<User>,
    public create: (body: any) => Promise<void>,
  ) { }
}

export default new UserUseCase(
  new FindOne().execute,
  new Create().execute,
);