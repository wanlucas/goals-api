import Goal, { IGoal } from '../../entity/Goal';
import Create from './Create';
import FindById from './FindById';
import FindAll from './FindAll';
import BulkCreate from './BulkCreate';
import FindByBranchId from './FindByBranchId';
import bulkDelete from './BulkDelete';
import { Body } from '../../../application/Interface';

export type ICreateGoal =  Omit<IGoal, 'score' | 'branchId'>

class GoalUseCase {
  constructor(
    public findAll: (userId: string) => Promise<Body<Goal>[]>,
    public findByBranchId: (branchId: string) => Promise<IGoal[]>,
    public bulkCreate: (userId: string, branchId: string, goals: ICreateGoal[]) => Promise<void>,
    public findById: (id: string) => Promise<Goal>,
    public create: (userId: string, body: IGoal) => Promise<void>,
    public bulkDelete: (userId: string, ids: string[]) => Promise<void>,
  ) { }
}

export default new GoalUseCase(
  new FindAll().execute,
  new FindByBranchId().execute,
  new BulkCreate().execute,
  new FindById().execute,
  new Create().execute,
  new bulkDelete().execute,
);
