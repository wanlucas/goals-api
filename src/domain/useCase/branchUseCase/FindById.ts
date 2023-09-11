import branchModel from '../../../infra/model/BranchModel';
import { NotFoundError } from '../../constant/HttpError';
import Branch from '../../entity/Branch';

export default class FindById {
  public async execute(id: string) {
    const foundBranch = await branchModel.findByPk(id);

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    return new Branch(foundBranch.dataValues);
  }
}
