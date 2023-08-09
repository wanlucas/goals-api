
import Entity, { IEntity } from './Entity';
import Joi from 'joi';
import Goal from './Goal';

const taskSchema = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string().min(3).max(200).required(),
  days: Joi.array().items(Joi.number().min(0).max(6)).required(),
  goalId: Joi.string().uuid().required(),
  goalTarget: Joi.number().min(1).required(),
});

export interface ITask extends IEntity {
  description: string;
  endDate: Date;
}

export default class Task extends Entity {
  public readonly description: string;
  public readonly goalId: string;

  public constructor (body: ITask, goal: Goal) {
    super({ ...body, goalId: goal.id, goalTarget: goal.target }, taskSchema);

    this.description = body.description;
    this.goalId = goal.id;
  }
}
