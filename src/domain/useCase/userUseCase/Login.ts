import db from '../../../infra/db';
import { ILogin } from '.';
import { createToken } from '../../../application/tool/webToken';
import { UnauthorizedError } from '../../constant/HttpError';

export default class Login {
  public async execute(payload: ILogin) {
    const foundUser = await db.user.findUnique({
      where: {
        name: payload.name,
        password: payload.password,
      }
    });

    if (!foundUser) throw new UnauthorizedError('Credenciais inválidas');

    return { 
      token: createToken(foundUser),
      id: foundUser.id,
    };
  }
}   