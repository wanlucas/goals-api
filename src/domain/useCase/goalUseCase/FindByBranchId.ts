import db from '../../../infra/db';

export default class FindByBranchId {
  public async execute(branchId: string) {
    const foundGoals = await db.goal.findMany({ where: { branchId } });
    return foundGoals;
  }
}
