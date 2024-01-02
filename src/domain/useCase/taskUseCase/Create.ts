import db from '../../../infra/db';
import Goal from '../../entity/Goal';
import { ITask } from '../../entity/Task';
import goalUseCase from '../goalUseCase';

export default class Create {
  public async execute(body: ITask) {
    const foundGoal = await goalUseCase.findById(body.goalId);
    const goal = new Goal(foundGoal);
    const task = goal.createTask(body);

    await db.task.create({
      data: task,
    });
  }
}
