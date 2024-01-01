import Task, { ITask, TaskRecord } from '../../entity/Task';
import Create from './Create';
import Done from './Done';
import Undone from './Undone';
import FindCurrent from './FindCurrent';
import FindById from './FindById';
import UpdateRecord from './UpdateRecord';
import { Body } from '../../../application/Interface';

export interface TaskWithRecord extends Task {
  record: TaskRecord | null;
}

class TaskUseCase {
  constructor(
    public findById: (id: string) => Promise<Body<Task> | undefined>,
    public findCurrent: (userId: string) => Promise<TaskWithRecord[]>,
    public create: (body: ITask) => Promise<void>,
    public done: (id: string) => Promise<void>,
    public undone: (id: string) => Promise<void>,
    public updateRecord: (taskId: string, body: Partial<TaskRecord>) => Promise<void>,
  ) {}
}

export default new TaskUseCase(
  new FindById().execute,
  new FindCurrent().execute,
  new Create().execute,
  new Done().execute,
  new Undone().execute,
  new UpdateRecord().execute,
);
