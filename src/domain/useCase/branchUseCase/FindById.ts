import { IBranchWithGoalsAndTasks } from '.';
import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';

export default class FindById {
  public async execute(id: string): Promise<IBranchWithGoalsAndTasks> {
    const foundBranch = await db.branch.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        goals: {
          where: {
            completedAt: null,
          },
          include: {
            tasks: true,
          },
        },
      },
    });

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    return foundBranch;
  }
}
