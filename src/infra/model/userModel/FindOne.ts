import User from '../../../domain/entity/User';
import knex from '../../db/config';

export default class FindOne {
  static async execute(id: string): Promise<User> {
    return knex('User')
      .select('*')
      .where({ id })
      .first();
  }
}