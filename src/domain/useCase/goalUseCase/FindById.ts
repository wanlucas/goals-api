import goalModel from '../../../infra/model/goalModel';
import { NotFoundError } from '../../constant/HttpError';

export default class FindById {
  public async execute(id: string) {
    const goal = await goalModel.findById(id);

    if (!goal) {
      throw new NotFoundError('Meta não encontrada!');
    }

    return goal;
  }
}
