import { Body } from '../../../application/Interface';
import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';
import Task from '../../entity/Task';
export default class FindById {
  public async execute(id: string): Promise<Body<Task>> {
    const foundTask = await db.task.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!foundTask) {
      throw new NotFoundError('Tarefa não encontrada!');
    }

    return foundTask;
  }
}
