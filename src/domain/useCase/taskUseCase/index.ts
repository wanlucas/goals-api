import Task, { ITask } from '../../entity/Task';
import Create from './Create';
// import FindById from './FindById';

class TaskUseCase {
  constructor(
    // public findById: (id: string) => Promise<Task | undefined>,
    public create: (body: ITask) => Promise<void>,
  ) { }
}

export default new TaskUseCase(
  // new FindById().execute,
  new Create().execute,
);
