
import Entity, { IEntity } from './Entity';
import Joi from 'joi';

const taskSchema = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string().min(3).max(200).required(),
  goalId: Joi.string().uuid().required(),
  duration: Joi.number().allow(null),
  quantity: Joi.number().allow(null),
  frequency: Joi.string().valid('daily', 'weekly', 'monthly').required(),
  time: Joi.string().length(8).required(),
  runAt: Joi.array()
    .when('frequency', {
      is: 'daily',
      then: Joi.valid(null),
    })
    .when('frequency', {
      is: 'weekly',
      then: Joi.array().items(Joi.number().min(0).max(6)),
    })
    .when('frequency', {
      is: 'monthly',
      then: Joi.array().items(Joi.number().min(1).max(31)),
    }), 
});

export interface ITask extends IEntity {
  description: string;
  goalId: string;
  duration: number | null;
  quantity: number | null;
  time: string | null;
  frequency: string;
  runAt: any;
}

export default class Task extends Entity {
  public readonly description: string;
  public readonly goalId: string;
  public readonly duration: number | null;
  public readonly quantity: number | null;
  public readonly frequency: string;
  public readonly time: string | null;
  public readonly runAt?: any;

  public constructor (body: ITask) {
    super(body, taskSchema);

    this.description = body.description;
    this.goalId = body.goalId;
    this.frequency = body.frequency;
    this.time = body.time;
    this.duration = body.duration || null;
    this.quantity = body.quantity || null;
    this.runAt = body.runAt || null;
  }
}