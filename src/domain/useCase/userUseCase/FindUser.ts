import userModel from "../../../infra/model/userModel";
import User from "../../entity/User";

export default class FindUser {
  public async execute(id: string): Promise<User> {
    const payload = await userModel.findOne(id);

    return new User(payload);
  }
}