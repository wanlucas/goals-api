
import Branch from '../../../domain/entity/Branch';
import FindById from './FindById';
import Create from './Create';
import FindAll from './FindAll';
import { QueryOptions } from '../../interface';

class BranchModel {
  constructor(
    public findAll: (builder?: QueryOptions) => Promise<Branch[]>,
    public findById: (id: string) => Promise<Branch | undefined>,
    public create: (branch: Branch) => Promise<void>,
  ) { }
}

export default new BranchModel(
  FindAll.execute,
  FindById.execute,
  Create.execute,
);
