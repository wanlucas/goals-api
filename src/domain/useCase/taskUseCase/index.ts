import Task, { ITask, TaskRecord } from '../../entity/Task';
import Create from './Create';
import Done from './Done';
import Undone from './Undone';
import FindCurrent from './FindCurrent';
import FindById from './FindById';
import UpdateRecord from './UpdateRecord';
import { Body } from '../../../application/Interface';
import Remove from './Remove';
import Goal from '../../entity/Goal';

export interface TaskWithGoalAndRecord extends Body<Task> {
  record: TaskRecord | null;
  goal: Pick<Goal, 'score' | 'target' | 'description'>;
}

class TaskUseCase {
  constructor(
    public findById: (id: string) => Promise<Body<Task>>,
    public findCurrent: (userId: string) => Promise<TaskWithGoalAndRecord[]>,
    public create: (body: ITask) => Promise<void>,
    public done: (id: string) => Promise<void>,
    public undone: (id: string) => Promise<void>,
    public updateRecord: (taskId: string, body: Partial<TaskRecord>) => Promise<void>,
    public remove: (id: string) => Promise<void>,
  ) { }
}

export default new TaskUseCase(
  new FindById().execute,
  new FindCurrent().execute,
  new Create().execute,
  new Done().execute,
  new Undone().execute,
  new UpdateRecord().execute,
  new Remove().execute,
);
