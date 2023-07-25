import User from "../../../domain/entity/User";
import FindUser from "./FindUser";
import CreateUser from "./CreateUser";

class UserModel {
  constructor(
    public findOne: (id: string) => Promise<User>,
    public createUser: (user: User) => Promise<void>,
  ) { }
}

export default new UserModel(
  FindUser.execute,
  CreateUser.execute,
);