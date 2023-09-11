import User, { IUser } from '../../entity/User';
import userModel from '../../../infra/model/UserModel';

export default class Create {
  // TODO - Verificação de nomes repetidos
  public async execute(body: IUser) {
    const user = new User(body);
    await userModel.create({ ...user });
  }
}