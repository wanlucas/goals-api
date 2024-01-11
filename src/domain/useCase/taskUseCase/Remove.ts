import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';
import DateTime from '../../entity/DateTime';

export default class Remove {
  public async execute(id: string) {
    const foundTask = await db.task.findUnique({
      where: {
        id,
      },
    });

    if (!foundTask) {
      throw new NotFoundError('Task não encontrada!');
    }

    const foundTaskRecord = await db.taskRecord.findFirst({
      where: {
        taskId: foundTask.id,
      },
    });

    if (foundTaskRecord) {
      await db.task.update({
        where: {
          id: foundTask.id,
        },
        data: {
          deletedAt: new DateTime(),
        },
      });
    } else {
      await db.task.delete({
        where: {
          id: foundTask.id,
        },
      });
    }
  }
}
