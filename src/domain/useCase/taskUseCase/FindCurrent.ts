import moment from 'moment';
import db from '../../../infra/db';
import { TaskWithStatus } from '.';

export default class FindCurrent {
  public async execute(userId: string): Promise<TaskWithStatus[]> {
    const now = moment();

    const foundTasks = await db.task.findMany({
      include: {
        records: {
          where: {
            date: {
              
            }
          },
        },
      },
      where: {
        goal: {
          branch: {
            userId,
          },
        },
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
      orderBy: {
        time: {
          sort: 'asc',
          nulls: 'last'
        }
      },
    });

    return foundTasks.map(({ records, ...task }) => ({
      ...task,
      done: records.length > 0,
    }));
  }
}
