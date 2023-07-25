import User, { IUser } from "../../entity/User";
import userModel from "../../../infra/model/userModel";

export default class CreateUser {
  public async execute(body: IUser) {
    const user = new User(body);
    await userModel.createUser(user);
  }
}