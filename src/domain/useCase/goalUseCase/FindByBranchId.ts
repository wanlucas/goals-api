import GoalModel from '../../../infra/model/GoalModel';
import Goal from '../../entity/Goal';

export default class FindByBranchId {
  public async execute(branchId: string) {
    const foundGoals = await GoalModel.findAll({ where: { branchId } });

    return foundGoals.map(({ dataValues }) => new Goal(dataValues));
  }
}
