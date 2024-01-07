import Branch, { IBranch } from '../../entity/Branch';
import FindAll from './FindAll';
import FindById from './FindById';
import Create from './Create';
import Update from './Update';
import Remove from './Remove';
import Goal from '../../entity/Goal';
import Task from '../../entity/Task';
import { Body } from '../../../application/Interface';

export interface IBranchWithGoalsAndTasks extends Body<Branch> {
  goals: (Body<Goal> & {
    tasks: Body<Task>[];
  })[];
}

export interface IBranchWithSummary extends Body<Branch> {
  completedGoals: number;
  completedTasks: number;
}

class BranchUseCase {
  constructor(
    public findAll: (userId: string) => Promise<Body<Branch>[]>,
    public findById: (id: string) => Promise<IBranchWithGoalsAndTasks>,
    public create: (userId: string, body: IBranch) => Promise<Branch>,
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
