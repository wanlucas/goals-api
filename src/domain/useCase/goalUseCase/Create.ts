
import Goal, { IGoal } from '../../entity/Goal';
import branchUseCase from '../branchUseCase';
import { NotFoundError, UnauthorizedError } from '../../constant/HttpError';
import GoalModel from '../../../infra/model/GoalModel';
import UserModel from '../../../infra/model/UserModel';

export default class Create {
  public async execute(userId: string, body: IGoal) {
    const foundUser = await UserModel.findByPk(userId);

    if (!foundUser) {
      throw new NotFoundError('Usuário não encontrado!');
    }

    const foundBranch = await branchUseCase.findById(body.branchId);
    
    if (foundBranch?.userId !== userId) {
      throw new UnauthorizedError('Usuário não autorizado!');
    }

    const goal = new Goal(body);

    await GoalModel.create({ ...goal });
  }
}
