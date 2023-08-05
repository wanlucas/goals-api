
import Goal from '../../../domain/entity/Goal';
import knex from '../../db/config';

export default class Create {
  static async execute(goal: Goal) {
    await knex('Goal')
      .insert(goal);
  }
}
