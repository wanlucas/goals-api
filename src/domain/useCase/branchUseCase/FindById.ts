import { IBranchWithGoalsAndTasks } from '.';
import branchModel from '../../../infra/model/BranchModel';
import { NotFoundError } from '../../constant/HttpError';
import sequelize from 'sequelize';

export default class FindById {
  public async execute(id: string): Promise<IBranchWithGoalsAndTasks> {
    const foundBranch = await branchModel.findByPk(id, {
      include: [{
        association: 'goals',
        attributes: {
          exclude: ['branchId'],
        },
        include: [{
          association: 'tasks',
          attributes: {
            exclude: ['goalId'],
          },
          required: false,
          where: {
            endDate: {
              [sequelize.Op.gte]: new Date(),
            }
          },
          include: [{
            association: 'days',
            attributes: [
              [sequelize.fn('GROUP_CONCAT', sequelize.col('day')), 'days'],
            ],
          }],
        }],
      }]
    });

    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    return foundBranch;
  }
}
