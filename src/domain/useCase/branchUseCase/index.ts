import { IBranch } from '../../entity/Branch';
import Create from './Create';
import FindById from './FindById';
import FindAll from './FindAll';
import Update from './Update';
import Remove from './Remove';

class BranchUseCase {
  constructor(
    public findAll: (userId: string) => Promise<IBranch[]>,
    public findById: (id: string) => Promise<IBranch | undefined>,
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
