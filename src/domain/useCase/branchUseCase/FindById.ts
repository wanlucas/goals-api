import { IBranchWithGoalsAndTasks } from '.';
import branchModel from '../../../infra/model/BranchModel';
import { NotFoundError } from '../../constant/HttpError';

export default class FindById {
  public async execute(id: string): Promise<IBranchWithGoalsAndTasks> {
    const foundBranch = await branchModel.findByPk(id, {
      include: [
        {
          association: 'goals',
          attributes: {
            exclude: ['branchId'],
          },
          include: [
            {
              association: 'tasks',
              attributes: {
                exclude: ['goalId'],
              },
            },
          ],
        },
      ]
    });

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    return foundBranch;
  }
}
