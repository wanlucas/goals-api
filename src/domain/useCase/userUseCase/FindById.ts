import userModel from '../../../infra/model/userModel';
import { NotFoundError } from '../../constant/HttpError';
import User from '../../entity/User';

export default class FindById {
  // TODO - remove campo de senha
  public async execute(id: string) {
    const user = await userModel.findById(id);
    
    if (!user) throw new NotFoundError('Usuário não encontrado');

    return new User(user);
  }
}