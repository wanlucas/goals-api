
import db from '../../../infra/db';
import DateTime from '../../entity/DateTime';

export default class BulkDelete {
  public async execute(userId: string, ids: string[]) {
    await db.goal.updateMany({
      where: {
        branch: {
          userId,
        },
        id: {
          in: ids,
        },
      },
      data: {
        deletedAt: new DateTime(),
      },
    });

    await db.goal.deleteMany({
      where: {
        completedAt: null,
        branch: {
          userId,
        },
        tasks: {
          every: {
            records: {
              none: {},
            }
          }
        },
        id: {
          in: ids,
        },
      },
    });
  }
}
