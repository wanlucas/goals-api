import moment from 'moment';
import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';

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

    await db.task.update({
      where: {
        id: foundTask.id,
      },
      data: {
        deletedAt: moment().toISOString(),
      },
    });
  }
}
