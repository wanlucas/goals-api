import { ILogin } from '.';
import { createToken } from '../../../application/tool/webToken';
import userModel from '../../../infra/model/UserModel';
import { UnauthorizedError } from '../../constant/HttpError';

export default class Login {
  public async execute(payload: ILogin) {
    const foundUser = await userModel.findOne({
      where: {
        name: payload.name,
        password: payload.password,
      }
    });

    if (!foundUser) throw new UnauthorizedError('Credenciais inválidas');

    return { 
      token: createToken(foundUser.dataValues),
      id: foundUser.id,
    };
  }
}   