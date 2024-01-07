import db from '../../../infra/db';

export default class FindByBranchId {
  public async execute(branchId: string) {
    const foundGoals = await db.goal.findMany({
      where: {
        completedAt: null,
        deletedAt: null,
        branch: {
          id: branchId,
        },
      },
    });
    return foundGoals;
  }
}
