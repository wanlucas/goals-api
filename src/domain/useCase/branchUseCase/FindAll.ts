import db from '../../../infra/db';

export default class FindAll {
  public async execute(userId: string) {
    const foundBranchs = await db.branch.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      include: {
        goals: {
          select: {
            _count: {
              select: {
                tasks: {
                  where: {
                    completedAt: {
                      not: null,
                    },
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            goals: {
              where: {
                completedAt: {
                  not: null,
                },
              },
            },
          },
        },
      },
    });

    return foundBranchs.map(({ _count, goals, ...branch }) => ({
      ...branch,
      completedTasks: goals.reduce((acc, { _count }) => acc + _count.tasks, 0),
      completedGoals: _count.goals,
    }));
  }
}
