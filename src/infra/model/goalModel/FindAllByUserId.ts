import Goal from '../../../domain/entity/Goal';
import knex from '../../db/config';
import { QueryOptions } from '../../interface';
  
export default class FindAllByUserId {
  static async execute(userId: string, { where }: QueryOptions = {}): Promise<Goal[]> {
    return knex('Goal')
      .select('*')
      .innerJoin('Branch', 'Goal.branchId', 'Branch.id')
      .where({ userId })
      .andWhere(where || {});
  }
}
