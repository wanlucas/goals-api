import CreateUser from "./CreateUser";

class UserUseCase {
  constructor(
    public createUser: (body: any) => Promise<void>,
  ) { }
}

export default new UserUseCase(
  new CreateUser().execute,
);