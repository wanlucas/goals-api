
import Branch from '../../../domain/entity/Branch';
import knex from '../../db/config';

export default class Create {
  static async execute(branch: Branch) {
    await knex('Branch')
      .insert(branch);
  }
}
