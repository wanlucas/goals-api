
import Branch, { IBranch } from '../../entity/Branch';
import branchModel from '../../../infra/model/branchModel';

export default class Create {
  public async execute(body: IBranch) {
    const branch = new Branch(body);
    await branchModel.create(branch);
  }
}
