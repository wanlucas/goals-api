import User from '../../entity/User';
import CreateUser from './CreateUser';
import FindUser from './FindUser';

class UserUseCase {
  constructor(
    public findOne: (id: string) => Promise<User>,
    public create: (body: any) => Promise<void>,
  ) { }
}

export default new UserUseCase(
  new FindUser().execute,
  new CreateUser().execute,
);