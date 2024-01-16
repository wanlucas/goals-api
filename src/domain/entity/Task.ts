import Entity, { IEntity } from './Entity';
import Joi from 'joi';

export enum Frequency {
  daily,
  weekly,
  monthly,
}

export enum TaskType {
  infinite,
  cumulative,
  crescent,
}

const taskSchema = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string().min(3).max(200).required(),
  goalId: Joi.string().uuid().required(),
  duration: Joi.number().allow(null),
  quantity: Joi.number().allow(null),
  time: Joi.string().length(5).allow(null),
  type: Joi.number().valid(0, 1, 2).required(),
  completedAt: Joi.string().length(10).allow(null),
  frequency: Joi.string()
    .valid(Frequency.daily, Frequency.weekly, Frequency.monthly)
    .required(),
  increment: Joi.number()
    .required()
    .when('type', {
      not: TaskType.crescent,
      then: Joi.valid(null),
    }),
  value: Joi.number()
    .when('type', {
      is: TaskType.infinite,
      then: Joi.valid(null),
    })
    .when('type', {
      is: TaskType.cumulative,
      then: Joi.number().min(1).required(),
    })
    .when('type', {
      is: TaskType.crescent,
      then: Joi.number().min(0).required(),
    }),
  runAt: Joi.array()
    .when('frequency', {
      is: Frequency.daily,
      then: Joi.valid(null),
    })
    .when('frequency', {
      is: Frequency.weekly,
      then: Joi.array().items(Joi.number().min(0).max(6)),
    })
    .when('frequency', {
      is: Frequency.monthly,
      then: Joi.array().items(Joi.number().min(1).max(31)),
    }),
});

const taskRecordSchema = Joi.object({
  taskId: Joi.string().uuid().required(),
  date: Joi.string().length(10).required(),
  done: Joi.boolean(),
  duration: Joi.number().allow(null),
  quantity: Joi.number().allow(null),
  value: Joi.number().allow(null),
});

export interface ITask extends IEntity {
  description: string;
  goalId: string;
  duration: number | null;
  quantity: number | null;
  time: string | null;
  increment: number | null;
  completedAt?: string | null;
  frequency: Frequency;
  value: number | null;
  type: TaskType;
  runAt?: number[];
}

interface ITaskRecord {
  taskId: string;
  date: string;
  done?: boolean;
  quantity?: number | null;
  duration?: number | null;
  value?: number | null;
}

export class TaskRecord {
  public taskId: string;
  public date: string;
  public done: boolean;
  public duration: number | null;
  public quantity: number | null;
  public value: number | null;

  public constructor(body: ITaskRecord) {
    Joi.assert(body, taskRecordSchema);
    this.taskId = body.taskId;
    this.date = body.date;
    this.quantity = body.quantity || 0;
    this.done = body.done || false;
    this.duration = body.duration || null;
    this.value = body.value || null;
  }
}

export default class Task extends Entity {
  public readonly description: string;
  public readonly goalId: string;
  public readonly duration: number | null;
  public readonly quantity: number;
  public readonly frequency: Frequency;
  public readonly time: string | null;
  public readonly completedAt: string | null;
  public readonly type: TaskType;
  public readonly increment: number | null;
  public readonly runAt: any;
  public value: number | null;

  public constructor(body: ITask) {
    super(body, taskSchema);

    this.description = body.description;
    this.goalId = body.goalId;
    this.frequency = body.frequency;
    this.time = body.time || null;
    this.value = body.value ?? null;
    this.duration = body.duration || null;
    this.completedAt = body.completedAt || null;
    this.quantity = body.quantity || 1;
    this.type = body.type;
    this.runAt = body.runAt;
    this.increment = body.increment || null;

    if (this.runAt) {
      this.runAt = Array.from(new Set(this.runAt));

      if (this.frequency === Frequency.weekly && this.runAt.length === 7) {
        this.runAt = undefined;
        this.frequency = Frequency.daily;
      }
    }
  }

  public setValue(value: number): void {
    if (this.value !== null && this.type === TaskType.crescent) {
      this.value = value;
    }
  }

  public addValue(value: number): void {
    this.setValue(this.value! + value);
  }

  public createRecord(record: Omit<ITaskRecord, 'taskId'>) {
    const duration = this.duration && Math.min(this.duration, record.duration || 0);
    const quantity = Math.min(this.quantity, record.quantity || 0);

    const taskRecord = new TaskRecord({
      taskId: this.id,
      date: record.date,
      value: record.value || this.value,
      duration,
      quantity,
    });

    if (!record.done && duration && record.duration === this.duration) {
      taskRecord.quantity = Math.min(quantity + 1, this.quantity);
      if (taskRecord.quantity < this.quantity) taskRecord.duration = 0;
    }

    taskRecord.done = taskRecord.quantity === this.quantity;

    return taskRecord;
  }
}
