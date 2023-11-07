import Task, { ITask } from '../../entity/Task';
import Create from './Create';
import Done from './Done';
import Undone from './Undone';
import FindCurrent from './FindCurrent';
import FindById from './FindById';

export interface TaskWithStatus extends Task {
  done: boolean;
}

class TaskUseCase {
  constructor(
    public findById: (id: string) => Promise<Task | undefined>,
    public findCurrent: (userId: string) => Promise<TaskWithStatus[]>,
    public create: (body: ITask) => Promise<void>,
    public done: (id: string) => Promise<void>,
    public undone: (id: string) => Promise<void>,
  ) {}
}

export default new TaskUseCase(
  new FindById().execute,
  new FindCurrent().execute,
  new Create().execute,
  new Done().execute,
  new Undone().execute,
);
