import db from '../../../infra/db';
import Task from '../../entity/Task';

export default class FindCurrent {
  public async execute(userId: string): Promise<Task[]> {
    const now = new Date();

    const foundTasks = await db.task.findMany({
      where: {
        goal: {
          branch: {
            userId,
          }
        },
        OR: [
          {
            frequency: 'daily',
          }, {
            frequency: 'weekly',
            runAt: {
              array_contains: now.getDay(),
            }
          }, {
            frequency: 'monthly',
            runAt: {
              array_contains: now.getDate(),
            }
          }
        ]
      },
    });

    return foundTasks.map((task) => new Task(task));
  }
}
