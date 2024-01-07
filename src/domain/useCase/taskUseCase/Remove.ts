import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';
import date from '../../../tool/date';

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
          deletedAt: date.now(),
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
