
import Branch from '../../../domain/entity/Branch';
import knex from '../../db/config';
import { QueryOptions } from '../../interface';
  
export default class FindAll {
  static async execute({ where }: QueryOptions): Promise<Branch[]> {
    return knex('Branch')
      .select('*')
      .where(where);
  }
}
