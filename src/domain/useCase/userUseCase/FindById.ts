import userModel from '../../../infra/model/UserModel';
import { NotFoundError } from '../../constant/HttpError';
import User from '../../entity/User';

export default class FindById {
  // TODO - remover campo de senha
  public async execute(id: string) {
    const foundUser = await userModel.findByPk(id);
    
    if (!foundUser) {
      throw new NotFoundError('Usuário não encontrado!');
    }

    return new User(foundUser);
  }
}