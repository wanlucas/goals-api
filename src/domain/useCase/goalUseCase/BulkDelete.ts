
import db from '../../../infra/db';

export default class BulkDelete {
  public async execute(userId: string, ids: string[]) {
    await db.goal.deleteMany({
      where: {
        branch: {
          userId,
        },
        id: {
          in: ids,
        },
      },
    });
  }
}
