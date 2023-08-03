import User from '../../../domain/entity/User';
import knex from '../../db/config';

export default class FindById {
  static async execute(id: string): Promise<User | undefined> {
    return knex('User')
      .select('*')
      .where({ id })
      .first();
  }
}