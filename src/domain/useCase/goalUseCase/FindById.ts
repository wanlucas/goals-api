import GoalModel from '../../../infra/model/GoalModel';
import { NotFoundError } from '../../constant/HttpError';
import Goal from '../../entity/Goal';

export default class FindById {
  public async execute(id: string) {
    const foundGoal = await GoalModel.findByPk(id);

    if (!foundGoal) {
      throw new NotFoundError('Meta não encontrada!');
    }

    return new Goal(foundGoal);
  }
}
