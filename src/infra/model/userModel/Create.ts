import User from '../../../domain/entity/User';
import knex from '../../db/config';

export default class Create {
  static async execute(user: User) {
    await knex('User')
      .insert(user);
  }
}