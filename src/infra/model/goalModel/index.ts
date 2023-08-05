
import Goal from '../../../domain/entity/Goal';
import FindById from './FindById';
import Create from './Create';
import FindAll from './FindAll';
import { QueryOptions } from '../../interface';
import FindAllByUserId from './FindAllByUserId';

class GoalModel {
  constructor(
    public findAll: (builder: QueryOptions) => Promise<Goal[]>,
    public findAllByUserId: (userId: string, builder?: QueryOptions) => Promise<Goal[]>,
    public findById: (id: string) => Promise<Goal | undefined>,
    public create: (goal: Goal) => Promise<void>,
  ) { }
}

export default new GoalModel(
  FindAll.execute,
  FindAllByUserId.execute,
  FindById.execute,
  Create.execute,
);
