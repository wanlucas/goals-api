import User from '../../../domain/entity/User';
import knex from '../../db/config';
import { QueryOptions } from '../../interface';

export default class FindOne {
  static async execute({ where }: QueryOptions): Promise<User | undefined> {
    return knex('User')
      .select('*')
      .where(where)
      .first();
  }
}