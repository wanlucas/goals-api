import branchModel from '../../../infra/model/BranchModel';
import { NotFoundError } from '../../constant/HttpError';

export default class Remove {
  public async execute(id: string) {
    const foundBranch = await branchModel.findByPk(id);

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    await branchModel.destroy({ where: { id } });
  }
}
