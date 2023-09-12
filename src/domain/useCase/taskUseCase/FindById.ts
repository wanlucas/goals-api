import TaskModel from '../../../infra/model/TaskModel';
import { NotFoundError } from '../../constant/HttpError';
import Task from '../../entity/Task';

export default class FindById {
  public async execute(id: string) {
    const foundTask = await TaskModel.findByPk(id);

    if (!foundTask) {
      throw new NotFoundError('Tarefa não encontrada!');
    }

    const taskData = foundTask.get();

    return new Task({ ...taskData, days: JSON.parse(taskData.days) });
  }
}
