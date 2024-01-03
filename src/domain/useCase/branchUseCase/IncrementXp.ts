import branchUseCase from '.';
import db from '../../../infra/db';
import Branch from '../../entity/Branch';

export default class IncrementXp {
  public async execute(id: string, variation: number) {
    const foundBranch = await branchUseCase.findById(id);
    const branch = new Branch({  ...foundBranch });

    branch.incrementXp(variation);

    await db.branch.update({
      where: {
        id,
      },
      data: branch,
    });
  }
}
