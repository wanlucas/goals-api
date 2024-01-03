import moment from 'moment';
import db from '../../../infra/db';
import { TaskWithRecord } from '.';

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
    const now = moment();

    const foundTasks = await db.task.findMany({
      include: {
        records: {
          where: {
            date: now.format('YYYY-MM-DD'),
          },
        },
      },
      where: {
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
                completedAt: now.format('YYYY-MM-DD'),
              },
            ],
          },
          {
            OR: [
              {
                frequency: 'daily',
              },
              {
                frequency: 'weekly',
                runAt: {
                  array_contains: now.day(),
                },
              },
              {
                frequency: 'monthly',
                runAt: {
                  array_contains: now.date(),
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
