import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';
import Branch, { IBranch } from '../../entity/Branch';

export default class Update {
  public async execute(id: string, body: Partial<IBranch>) {
    const foundBranch = await db.branch.findUnique({
      where: {
        id,
      }
    });

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    const branch = new Branch({ ...foundBranch, ...body });

    await db.branch.update({
      where: {
        id,
        deletedAt: null,
      },
      data: branch,
    });
  }
}
