
import Entity, { IEntity } from './Entity';
import Joi from 'joi';

const taskSchema = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string().min(3).max(200).required(),
  goalId: Joi.string().uuid().required(),
  duration: Joi.number().allow(null),
  quantity: Joi.number(),
  frequency: Joi.string().valid('daily', 'weekly', 'monthly').required(),
  time: Joi.string().length(5).allow(null),
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

const taskRecordSchema = Joi.object({
  taskId: Joi.string().uuid().required(),
  date: Joi.string().length(10).required(),
  done: Joi.boolean().required(),
  duration: Joi.number().allow(null),
  quantity: Joi.number().allow(null),
});

enum Frequency {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
}

export interface ITask extends IEntity {
  description: string;
  goalId: string;
  duration: number | null;
  quantity: number;
  time: string | null;
  frequency: string;
  runAt?: number[]
}

interface ITaskRecord {
  taskId: string;
  date: string;
  done: boolean;
  duration: number | null;
  quantity: number;
}


export class TaskRecord {
  public taskId: string;
  public date: string;
  public done: boolean;
  public duration: number | null;
  public quantity: number | null;

  public constructor (body: ITaskRecord) {
    Joi.assert(body, taskRecordSchema);
    this.taskId = body.taskId;
    this.date = body.date;
    this.duration = body.duration;
    this.quantity = body.quantity || 0;
    this.done = body.done;
  }
}

export default class Task extends Entity {
  public readonly description: string;
  public readonly goalId: string;
  public readonly duration: number | null;
  public readonly quantity: number;
  public readonly frequency: string;
  public readonly time: string | null;
  public readonly runAt: any;

  public constructor (body: ITask) {
    super(body, taskSchema);

    this.description = body.description;
    this.goalId = body.goalId;
    this.frequency = body.frequency;
    this.time = body.time || null;
    this.duration = body.duration || null;
    this.quantity = body.quantity;
    this.runAt = body.runAt;

    if (this.runAt) {
      this.runAt = Array.from(new Set(this.runAt));

      if (this.frequency === Frequency.weekly && this.runAt.length === 7) {
        this.runAt = undefined;
        this.frequency = Frequency.daily;
      }
    }
  }

  public createRecord(record: TaskRecord) {
    let duration = this.duration && Math.min(this.duration, record.duration || 0);
    let quantity = Math.min(this.quantity, record.quantity || 0);

    if (!record.done && duration && record.duration === this.duration) {
      quantity = Math.min(quantity += 1, this.quantity);
      if (quantity < this.quantity) duration = 0;
    }

    return new TaskRecord({
      taskId: this.id,
      date: record.date,
      done: this.quantity === quantity,
      duration,
      quantity,
    });
  }
}