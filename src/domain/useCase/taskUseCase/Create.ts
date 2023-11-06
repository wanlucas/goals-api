import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';
import Task, { ITask } from '../../entity/Task';

export default class Create {
  public async execute(body: ITask) {
    const task = new Task(body);
    const foundGoal = await db.goal.findUnique({
      where: {
        id: task.goalId,
      },
    });

    if (!foundGoal) {
      throw new NotFoundError('Meta não encontrada');
    }

    await db.task.create({
      data: task,
    });
  }
}
