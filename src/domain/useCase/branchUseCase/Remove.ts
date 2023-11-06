import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';

export default class Remove {
  public async execute(id: string) {
    const foundBranch = await db.branch.findUnique({
      where: {
        id,
      }
    });

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    await db.branch.delete({ where: { id } });
  }
}
