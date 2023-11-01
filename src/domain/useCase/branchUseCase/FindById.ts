import { IBranchWithGoalsAndTasks } from '.';
import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';

export default class FindById {
  public async execute(id: string): Promise<any> {
    const foundBranch = await db.branch.findUnique({
      where: {
        id,
      },
      include: {
        goals: {
          include: {
            tasks: {
              select: {
                id: true,
                days: {
                  select: {
                    day: true,
                  }
                }
              }
            },
          },
        },
      }
    });

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    return foundBranch;
  }
}
