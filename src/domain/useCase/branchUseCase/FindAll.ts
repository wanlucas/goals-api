import db from '../../../infra/db';

export default class FindAll {
  public async execute(userId: string) {
    const foundBranchs = await db.branch.findMany({
      where: {
        userId,
      }
    });

    return foundBranchs;
  }
}
