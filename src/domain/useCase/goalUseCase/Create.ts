
import db from '../../../infra/db';
import Goal, { IGoal } from '../../entity/Goal';
import { NotFoundError, UnauthorizedError } from '../../constant/HttpError';

export default class Create {
  public async execute(userId: string, body: IGoal) {
    const goal = new Goal(body);
    const foundUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      throw new NotFoundError('Usuário não encontrado!');
    }

    const foundBranch = await db.branch.findUnique({
      where: {
        id: goal.branchId,
        deletedAt: null,
      },
    });

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }
    
    if (foundBranch.userId !== userId) {
      throw new UnauthorizedError('Usuário não autorizado!');
    }

    await db.goal.create({ data: goal });
  }
}
