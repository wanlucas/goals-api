import Task, { ITask } from '../../entity/Task';
import Create from './Create';
import FindCurrent from './FindCurrent';
import FindById from './FindById';

class TaskUseCase {
  constructor(
    public findById: (id: string) => Promise<Task | undefined>,
    public findCurrent: (userId: string) => Promise<Task[]>,
    public create: (body: ITask) => Promise<void>,
  ) { }
}

export default new TaskUseCase(
  new FindById().execute,
  new FindCurrent().execute,
  new Create().execute,
);
