import goalModel from '../../../infra/model/goalModel';

export default class FindAll {
  public async execute(userId: string) {
    return goalModel.findAllByUserId(userId);
  }
}
