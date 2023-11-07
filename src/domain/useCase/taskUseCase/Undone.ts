import db from '../../../infra/db';
import moment from 'moment';

export default class Undone {
  public async execute(id: string): Promise<void> {
    const today = moment().format('YYYY-MM-DD');

    await db.taskRecord.delete({
      where: {
        taskId_date: {
          taskId: id,
          date: today,
        },
      },
    });
  }
}
