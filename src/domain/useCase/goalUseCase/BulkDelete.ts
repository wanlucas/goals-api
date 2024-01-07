
import db from '../../../infra/db';
import date from '../../../tool/date';

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
        deletedAt: date.now(),
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
