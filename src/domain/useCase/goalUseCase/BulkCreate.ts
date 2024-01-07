
import db from '../../../infra/db';
import Goal from '../../entity/Goal';
import { NotFoundError, UnauthorizedError, UnprocessableEntityError } from '../../constant/HttpError';
import { ICreateGoal } from '.';

export default class BulkCreate {
  public async execute(userId: string, branchId: string, payload: ICreateGoal[]) {
    if (!payload || !payload.length) {
      throw new UnprocessableEntityError('Metas não fornecidas!');
    }
    const goals = payload.map((goal) => new Goal({
      ...goal,
      branchId,
    }));
  
    const foundBranch = await db.branch.findUnique({
      where: {
        id: branchId,
        deletedAt: null,
      },
    });

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }
    
    if (foundBranch.userId !== userId) {
      throw new UnauthorizedError('Usuário não autorizado!');
    }

    await db.goal.createMany({ data: goals });
  }
}
