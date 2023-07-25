import User from "../../../domain/entity/User";
import CreateUser from "./CreateUser";

class UserModel {
  constructor(
    public createUser: (user: User) => Promise<void>,
  ) { }
}

export default new UserModel(
  CreateUser.execute,
);