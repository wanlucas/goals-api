import Branch, { IBranch } from '../../entity/Branch';
import FindAll from './FindAll';
import FindById from './FindById';
import Create from './Create';
import Update from './Update';
import Remove from './Remove';
import Goal from '../../entity/Goal';
import Task from '../../entity/Task';

export interface IBranchWithGoalsAndTasks extends Branch {
  goals: (Partial<Goal> & {
    tasks: Partial<Task>[];
  })[];
}

class BranchUseCase {
  constructor(
    public findAll: (userId: string) => Promise<Branch[]>,
    public findById: (id: string) => Promise<IBranchWithGoalsAndTasks | null>,
    public create: (userId: string, body: IBranch) => Promise<void>,
    public update: (id: string, body: Partial<IBranch>) => Promise<void>,
    public remove: (id: string) => Promise<void>,
  ) { }
}

export default new BranchUseCase(
  new FindAll().execute,
  new FindById().execute,
  new Create().execute,
  new Update().execute,
  new Remove().execute,
);
