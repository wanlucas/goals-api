import User, { IUser } from '../../entity/User';
import userModel from '../../../infra/model/userModel';

export default class Create {
  public async execute(body: IUser) {
    const user = new User(body);
    await userModel.create(user);
  }
}