import branchModel from '../../../infra/model/branchModel';
import { NotFoundError } from '../../constant/HttpError';

export default class FindById {
  public async execute(id: string) {
    const branch = await branchModel.findById(id);

    if (!branch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    return branch;
  }
}
