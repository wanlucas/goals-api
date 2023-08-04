import branchModel from '../../../infra/model/branchModel';

export default class FindById {
  public async execute(id: string) {
    return branchModel.findById(id);
  }
}
