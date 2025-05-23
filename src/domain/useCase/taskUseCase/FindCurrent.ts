import db from '../../../infra/db';
import { TaskWithGoalAndRecord } from '.';
import { Frequency } from '../../entity/Task';
import DateTime from '../../entity/DateTime';
import { Body } from '../../../application/Interface';

export default class FindCurrent {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  public async execute(userId: string): Promise<Body<TaskWithGoalAndRecord>[]> {
    const today = new DateTime();

    const foundTasks = await db.task.findMany({
      include: {
        goal: {
          select: {
            description: true,
            score: true,
            target: true,
          }
        },
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

    return foundTasks.map(({ records, ...task }) => ({
      ...task,
      record: records[0] || null,
    }));
  }
}
