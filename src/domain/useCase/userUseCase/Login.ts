import { ILogin } from '.';
import { createToken } from '../../../application/tool/webToken';
import userModel from '../../../infra/model/userModel';
import { UnauthorizedError } from '../../constant/HttpError';

export default class Login {
  public async execute(payload: ILogin) {
    const user = await userModel.findOne({
      where: {
        name: payload.name,
        password: payload.password,
      }
    });

    if (!user) throw new UnauthorizedError('Credenciais inválidas');

    return { 
      token: createToken(user),
      id: user.id,
    };
  }
}