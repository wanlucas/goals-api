
import { IGoal } from '../../entity/Goal';
import Create from './Create';
import FindById from './FindById';
import FindAll from './FindAll';

class GoalUseCase {
  constructor(
    public findAll: (userId: string) => Promise<IGoal[]>,
    public findById: (id: string) => Promise<IGoal | undefined>,
    public create: (userId: string, body: IGoal) => Promise<void>,
  ) { }
}

export default new GoalUseCase(
  new FindAll().execute,
  new FindById().execute,
  new Create().execute,
);
