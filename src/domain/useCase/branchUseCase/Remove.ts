import db from '../../../infra/db';
import { NotFoundError } from '../../constant/HttpError';
import date from '../../../tool/date';

export default class Remove {
  public async execute(id: string) {
    const foundBranch = await db.branch.findUnique({
      where: {
        id,
      },
    });

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    const foundTaskRecord = await db.goal.findFirst({
      where: {
        branchId: foundBranch.id,
        tasks: {
          some: {
            records: {
              some: {}
            },
          },
        },
      },
    });

    if (!foundTaskRecord) {
      await db.branch.delete({
        where: {
          id,
        },
      });

      return;
    }

    const deletedAt = date.now();
    const updatedGoals = await db.branch.update({
      where: {
        id,
      },
      data: {
        deletedAt,
        goals: {
          updateMany: {
            where: {
              deletedAt: null,
            },
            data: {
              deletedAt, 
            }
          }
        }
      },
      select: {
        goals: {
          select: {
            id: true,
          }
        }
      }
    });
    
    const ids = updatedGoals.goals.reduce((acc, goal) => {
      acc.add(goal.id);
      return acc;
    }, new Set<string>());

    await db.task.updateMany({
      where: {
        goalId: {
          in: [...ids],
        },
      },
      data: {
        deletedAt,
      },
    });
  }
}
