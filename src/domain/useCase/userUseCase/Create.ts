import User, { IUser } from '../../entity/User';
import db from '../../../infra/db';
import { ConflictError } from '../../constant/HttpError';

export default class Create {
  public async execute(body: IUser) {
    const user = new User(body);
    // TODO - treat duplicated name

    const userAlreadyExists = await db.user.findUnique({
      where: { name: body.name }
    });

    if (userAlreadyExists) {
      throw new ConflictError('Usuário já existe!');
    }

    await db.user.create({ data: user });
  }
}