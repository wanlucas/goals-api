import db from '../../../infra/db';
import { TaskWithRecord } from '.';
import { Frequency } from '../../entity/Task';
import DateTime from '../../entity/DateTime';

export default class FindCurrent {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  // TODO: remove any
  private format(tasks: any[]): TaskWithRecord[] {
    return tasks.map(({ records, ...task }) => ({
      ...task,
      record: records[0] || null,
    }));
  }

  public async execute(userId: string): Promise<any> {
    const today = new DateTime();

    const foundTasks = await db.task.findMany({
      include: {
        records: {
          where: {
            date: today.toYearMonthDay(),
          },
        },
      },
      where: {
        deletedAt: null,
        goal: {
          branch: {
            userId,
          },
        },
        AND: [
          {
            OR: [
              {
                completedAt: null,
              },
              {
                completedAt: today.toYearMonthDay(),
              },
            ],
          },
          {
            OR: [
              {
                frequency: Frequency.daily,
              },
              {
                frequency: Frequency.weekly,
                runAt: {
                  array_contains: today.getDay(),
                },
              },
              {
                frequency: Frequency.monthly,
                runAt: {
                  array_contains: today.getDate(),
                },
              },
            ],
          },
        ],
      },
      orderBy: {
        time: {
          sort: 'asc',
          nulls: 'last',
        },
      },
    });

    return this.format(foundTasks);
  }
}
