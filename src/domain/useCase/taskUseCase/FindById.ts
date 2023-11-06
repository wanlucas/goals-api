import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';
import Task from '../../entity/Task';

export default class FindById {
  public async execute(id: string) {
    const foundTask = await db.task.findUnique({
      where: {
        id,
      },
    });

    if (!foundTask) {
      throw new NotFoundError('Tarefa não encontrada!');
    }

    return new Task(foundTask);
  }
}
