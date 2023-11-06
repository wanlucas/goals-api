
import { Goal } from '@prisma/client';
import { IGoal } from '../../entity/Goal';
import Create from './Create';
// import FindById from './FindById';
import FindAll from './FindAll';
// import FindByBranchId from './FindByBranchId';

class GoalUseCase {
  constructor(
    public findAll: (userId: string) => Promise<Goal[]>,
    // public findById: (id: string) => Promise<IGoal | undefined>,
    // public findByBranchId: (branchId: string) => Promise<IGoal[]>,
    public create: (userId: string, body: IGoal) => Promise<void>,
  ) { }
}

export default new GoalUseCase(
  new FindAll().execute,
  // new FindById().execute,
  // new FindByBranchId().execute,
  new Create().execute,
);
