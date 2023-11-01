
import Entity, { IEntity } from './Entity';
import Joi from 'joi';

const taskSchema = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string().min(3).max(200).required(),
  days: Joi.array().min(1).items(Joi.number().min(0).max(6)).required(),
  goalId: Joi.string().uuid().required(),
  duration: Joi.number().allow(null),
  quantity: Joi.number().allow(null),
  endDate: Joi.date(),
});

export interface ITask extends IEntity {
  description: string;
  goalId: string;
  endDate?: Date;
  duration?: number;
  quantity?: number;
  days: number[];
}

export default class Task extends Entity {
  public readonly description: string;
  public readonly goalId: string;
  public readonly endDate?: Date;
  public readonly duration?: number;
  public readonly quantity?: number;
  public readonly days: number[];

  public constructor (body: ITask) {
    super(body, taskSchema);

    this.description = body.description;
    this.goalId = body.goalId;
    this.endDate = body.endDate && new Date(body.endDate);
    this.duration = body.duration;
    this.quantity = body.quantity;
    this.days = body.days;
  }
}