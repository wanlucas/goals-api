import db from '../../../infra/db';

export default class FindAll {
  public async execute(userId: string) {
    const foundGoals = await db.goal.findMany({
      where: {
        completedAt: null,
        deletedAt: null,
        branch: {
          userId,
        }
      }
    });

    return foundGoals;
  }
}
