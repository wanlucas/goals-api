import db from '../../../infra/db';
import moment from 'moment';

export default class Done {
  public async execute(id: string): Promise<void> {
    const today = moment().format('YYYY-MM-DD');

    await db.taskRecord.create({
      data: {
        taskId: id,
        date: today,
      },
    });
  }
}
