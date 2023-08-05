
import Goal, { IGoal } from '../../entity/Goal';
import goalModel from '../../../infra/model/goalModel';
import branchUseCase from '../branchUseCase';
import { UnauthorizedError } from '../../constant/HttpError';

export default class Create {
  public async execute(userId: string, body: IGoal) {
    const goal = new Goal(body);
    const branch = await branchUseCase.findById(body.branchId);

    if (branch?.userId !== userId) {
      throw new UnauthorizedError('Usuário não autorizado!');
    }

    await goalModel.create(goal);
  }
}
