
import { NotFoundError } from '../../constant/HttpError';
import Branch, { IBranch } from '../../entity/Branch';

export default class Update {
  // TODO impedir atualização de xp
  public async execute(id: string, body: Partial<IBranch>) {
    const foundBranch = await BranchModel.findByPk(id);


    if (!foundBranch) {
      throw new NotFoundError('Branch não encontrada!');
    }

    const branch = new Branch({ ...foundBranch.dataValues, ...body });

    await BranchModel.update(branch, { where: { id } });
  }
}
