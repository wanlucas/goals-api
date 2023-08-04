
import Branch from '../../../domain/entity/Branch';
import knex from '../../db/config';
  
export default class FindById {
  static async execute(id: string): Promise<Branch | undefined> {
    return knex('Branch')
      .select('*')
      .where({ id })
      .first();
  }
}
