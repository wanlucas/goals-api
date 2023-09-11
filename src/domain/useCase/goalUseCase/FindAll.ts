import GoalModel from '../../../infra/model/GoalModel';
import Goal from '../../entity/Goal';

export default class FindAll {
  public async execute(userId: string) {
    const foundGoals = await GoalModel.findAll({ 
      include: {
        association: 'branch',
        attributes: [],
        where: {
          userId,
        }
      }
    });

    return foundGoals.map(({ dataValues }) => new Goal(dataValues));
  }
}
