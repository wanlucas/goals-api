import db from '../../../infra/db';
import moment from 'moment';
import Task, { ITask } from '../../entity/Task';
import { TaskRecord } from '@prisma/client';

export default class UpdateRecord {
  public async execute(
    taskId: string,
    record: Partial<TaskRecord>,
  ): Promise<void> {
    const today = moment().format('YYYY-MM-DD');

    const foundTask = await db.task.findUnique({
      include: {
        records: {
          where: {
            date: today,
          },
        },
      },
      where: {
        id: taskId,
      },
    });

    if (!foundTask) throw new Error('Task not found');
  
    const foundRecord = foundTask?.records[0] || {};

    const task = new Task(foundTask as ITask);

    const taskRecord = task.createRecord({
      ...foundRecord,
      ...record,
      date: today,
    });

    if (!taskRecord.duration && !taskRecord.quantity) {
      await db.taskRecord.delete({
        where: {
          taskId_date: {
            taskId,
            date: today,
          },
        },
      });
    } else {
      await db.taskRecord.upsert({
        where: {
          taskId_date: {
            taskId,
            date: today,
          },
        },
        update: taskRecord,
        create: taskRecord,
      });
    }
  }
}
