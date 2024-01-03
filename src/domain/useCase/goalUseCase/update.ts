import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';
import Goal from '../../entity/Goal';
import branchUseCase from '../branchUseCase';

export default class Update {
  public async execute(id: string, body: Partial<Goal>) {
    const foundGoal = await db.goal.findUnique({
      where: {
        id,
      }
    });

    if (!foundGoal) {
      throw new NotFoundError('Meta não encontrada!');
    }

    const goal = new Goal({ ...foundGoal, ...body });

    // TODO - remove xp too  
    if (foundGoal.target !== foundGoal.score && goal.isCompleted()) {
      await branchUseCase.incrementXp(goal.branchId, goal.getXp());
    }

    await db.goal.update({
      where: {
        id,
      },
      data: goal,
    });
  }
}
