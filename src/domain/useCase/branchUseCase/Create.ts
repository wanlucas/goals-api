import db from '../../../infra/db';
import Branch, { IBranch } from '../../entity/Branch';
import { ConflictError, NotFoundError } from '../../constant/HttpError';

export default class Create {
  public async execute(userId: string, body: IBranch) {
    // TODO impedir criação com xp
    const branch = new Branch({ ...body, userId });
    const foundUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      throw new NotFoundError('Usuário não encontrado!');
    }

    const branchAlreadyExists = await db.branch.findFirst({
      where: {
        name: branch.name,
        userId
      },
    });

    if (branchAlreadyExists) {
      throw new ConflictError(`A branch ${branch.name} já existe!`);
    }

    await db.branch.create({ data: branch });
  }
}
