
import GoalModel from '../../../infra/model/GoalModel';
import TaskModel from '../../../infra/model/TaskModel';
import { NotFoundError } from '../../constant/HttpError';
import Task, { ITask } from '../../entity/Task';

export default class Create {
  public async execute(body: ITask) {
    const foundGoal = await GoalModel.findOne({ where: { id: body.goalId } });

    if (!foundGoal) {
      throw new NotFoundError('Meta não encontrada');
    }

    const task = new Task(body);
    await TaskModel.create({ ...task, days: JSON.stringify(task.days) });
  }
}
