import User from "../../entity/User";
import CreateUser from "./CreateUser";
import FindUser from "./FindUser";

class UserUseCase {
  constructor(
    public findUser: (id: string) => Promise<User>,
    public createUser: (body: any) => Promise<void>,
  ) { }
}

export default new UserUseCase(
  new FindUser().execute,
  new CreateUser().execute,
);