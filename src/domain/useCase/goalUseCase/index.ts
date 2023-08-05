
import Goal, { IGoal } from '../../entity/Goal';
import Create from './Create';
import FindById from './FindById';
import FindAll from './FindAll';

class GoalUseCase {
  constructor(
    public findAll: (userId: string) => Promise<Goal[]>,
    public findById: (id: string) => Promise<Goal | undefined>,
    public create: (userId: string, body: IGoal) => Promise<void>,
  ) { }
}

export default new GoalUseCase(
  new FindAll().execute,
  new FindById().execute,
  new Create().execute,
);
