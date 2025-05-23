import Goal, { IGoal } from '../../entity/Goal';
import Create from './Create';
import FindById from './FindById';
import FindAll from './FindAll';
import BulkCreate from './BulkCreate';
import FindByBranchId from './FindByBranchId';
import bulkDelete from './BulkDelete';
import Update from './update';
import { Body } from '../../../application/Interface';

export type ICreateGoal =  Omit<IGoal, 'score' | 'branchId'>

class GoalUseCase {
  constructor(
    public findAll: (userId: string) => Promise<Body<Body<Goal>>[]>,
    public findByBranchId: (branchId: string) => Promise<Body<Goal>[]>,
    public bulkCreate: (userId: string, branchId: string, goals: ICreateGoal[]) => Promise<void>,
    public findById: (id: string) => Promise<Body<Goal>>,
    public create: (userId: string, body: IGoal) => Promise<void>,
    public bulkDelete: (userId: string, ids: string[]) => Promise<void>,
    public update: (id: string, body: Partial<IGoal>) => Promise<void>,
  ) { }
}

export default new GoalUseCase(
  new FindAll().execute,
  new FindByBranchId().execute,
  new BulkCreate().execute,
  new FindById().execute,
  new Create().execute,
  new bulkDelete().execute,
  new Update().execute,
);
