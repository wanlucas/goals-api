
import Goal from '../../../domain/entity/Goal';
import knex from '../../db/config';
import { QueryOptions } from '../../interface';
  
export default class FindAll {
  static async execute({ where }: QueryOptions = {}): Promise<Goal[]> {
    return knex('Goal')
      .select('*')
      .where(where || {});
  }
}