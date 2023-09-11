import { IBranch } from '../../entity/Branch';
import Create from './Create';
import FindById from './FindById';
import FindAll from './FindAll';

class BranchUseCase {
  constructor(
    public findAll: (userId: string) => Promise<IBranch[]>,
    public findById: (id: string) => Promise<IBranch | undefined>,
    public create: (userId: string, body: IBranch) => Promise<void>,
  ) { }
}

export default new BranchUseCase(
  new FindAll().execute,
  new FindById().execute,
  new Create().execute,
);
