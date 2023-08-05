
import Goal from '../../../domain/entity/Goal';
import knex from '../../db/config';
  
export default class FindById {
  static async execute(id: string): Promise<Goal | undefined> {
    return knex('Goal')
      .select('*')
      .where({ id })
      .first();
  }
}
