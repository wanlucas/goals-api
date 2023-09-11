import branchModel from '../../../infra/model/BranchModel';
import Branch from '../../entity/Branch';

export default class FindAll {
  public async execute(userId: string) {
    const foundBranchs = await branchModel.findAll({
      where: {
        userId,
      }
    });

    return foundBranchs.map(({ dataValues }) =>
      new Branch(dataValues)
    );
  }
}
