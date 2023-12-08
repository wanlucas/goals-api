import db from '../../../infra/db';
import moment from 'moment';
import { NotFoundError } from '../../constant/HttpError';

export default class Done {
  public async execute(id: string): Promise<void> {
    const foundTask = await db.task.findUnique({
      where: {
        id,
      },
    });

    if (!foundTask) throw new NotFoundError('Task não encontrada');

    const today = moment().format('YYYY-MM-DD');

    await db.taskRecord.create({
      data: {
        taskId: id,
        date: today,
        done: true,
        duration: foundTask.duration,
        quantity: foundTask.quantity,
      },
    });
  }
}
