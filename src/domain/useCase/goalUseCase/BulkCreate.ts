
import db from '../../../infra/db';
import Goal from '../../entity/Goal';
import { NotFoundError, UnauthorizedError } from '../../constant/HttpError';
import { ICreateGoal } from '.';

export default class BulkCreate {
  public async execute(userId: string, branchId: string, payload: ICreateGoal[]) {
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
        id: branchId,
      },
    });

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }
    
    if (foundBranch.userId !== userId) {
      throw new UnauthorizedError('Usuário não autorizado!');
    }

    const goals = payload.map(({ description, difficulty, target }) => new Goal({
      description,
      difficulty,
      target,
      branchId,
    }));

    await db.goal.createMany({ data: goals });
  }
}
