import { IBranchWithGoalsAndTasks } from '.';
import branchModel from '../../../infra/model/BranchModel';
import { NotFoundError } from '../../constant/HttpError';
import Sequelize from 'sequelize';

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
              required: false,
              where: {
                endDate: {
                  [Sequelize.Op.lte]: new Date(),
                }
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
