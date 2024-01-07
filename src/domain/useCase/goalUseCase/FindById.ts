import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';
import Goal from '../../entity/Goal';

export default class FindById {
  public async execute(id: string): Promise<Goal> {
    const foundGoal = await db.goal.findUnique({
      where: {
        id,
        completedAt: null,
        deletedAt: null,
      }
    });

    if (!foundGoal) {
      throw new NotFoundError('Meta não encontrada!');
    }

    return new Goal(foundGoal);
  }
}
