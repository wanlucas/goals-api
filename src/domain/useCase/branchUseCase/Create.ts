import db from '../../../infra/db';
import Branch, { IBranch } from '../../entity/Branch';
import { NotFoundError } from '../../constant/HttpError';

export default class Create {
  public async execute(userId: string, body: IBranch) {
    const branch = new Branch({ ...body, userId });
    const foundUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      throw new NotFoundError('Usuário não encontrado!');
    }

    await db.branch.create({ data: branch });

    return branch;
  }
}
