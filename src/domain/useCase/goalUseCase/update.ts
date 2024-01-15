import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';
import Goal from '../../entity/Goal';

export default class Update {
  public async execute(id: string, body: Partial<Goal>) {
    const foundGoal = await db.goal.findUnique({
      where: {
        deletedAt: null,
        id,
      }
    });

    if (!foundGoal) {
      throw new NotFoundError('Meta não encontrada!');
    }

    const goal = new Goal({ ...foundGoal, ...body });

    await db.goal.update({
      where: {
        id,
      },
      data: goal,
    });
  }
}
