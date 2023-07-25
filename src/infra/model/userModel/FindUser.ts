import User from '../../../domain/entity/User';
import knex from '../../db/config';

export default class FindUser {
  static async execute(id: string): Promise<User> {
    return knex('User')
      .select('*')
      .where({ id })
      .first();
  }
}