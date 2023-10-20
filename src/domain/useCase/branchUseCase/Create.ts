import Branch, { IBranch } from '../../entity/Branch';
import branchModel from '../../../infra/model/BranchModel';
import UserModel from '../../../infra/model/UserModel';
import { NotFoundError } from '../../constant/HttpError';

export default class Create {
  public async execute(userId: string, body: IBranch) {
    // TODO impedir criação com xp
    const foundUser = await UserModel.findByPk(userId);

    if (!foundUser) {
      throw new NotFoundError('Usuário não encontrado!');
    }

    const branch = new Branch({ ...body, userId });
    await branchModel.create({ ...branch });
  }
}
