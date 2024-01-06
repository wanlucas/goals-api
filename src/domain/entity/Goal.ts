import Entity, { IEntity } from './Entity';
import Joi from 'joi';
import Task, { ITask, TaskType } from './Task';
import { UnprocessableEntityError } from '../constant/HttpError';
import moment from 'moment';

const goalSchema = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string().min(3).max(200).required(),
  target: Joi.number().min(1).allow(null),
  branchId: Joi.string().uuid().required(),
  completedAt: Joi.string().length(8).allow(null),
  score: Joi.allow(null).when('target', {
    is: Joi.number(),
    then: Joi.number().min(0).max(Joi.ref('target')),
    otherwise: Joi.forbidden(),
  }),
});

export interface IGoal extends IEntity {
  description: string;
  target?: number | null;
  score?: number | null;
  branchId: string;
  completedAt?: string | null;
}

export default class Goal extends Entity {
  public readonly description: string;
  public readonly target: number | null;
  public readonly branchId: string;
  public completedAt: string | null;
  public score: number | null;

  public constructor (body: IGoal) {
    super(body, goalSchema);

    this.description = body.description;
    this.target = body.target || null;
    this.branchId = body.branchId;
    this.score = body.score || (this.target ? 0 : null);
    this.completedAt = body.completedAt || null;

    if (this.isCompleted() && !this.completedAt) {
      this.completedAt = this.getDate();
    } else if (!this.isCompleted() && this.completedAt) {
      this.completedAt = null;
    }
  }

  public createTask(task: Omit<ITask, 'goalId'>): Task {
    if (this.target) {
      if (!task.value) {
        throw new UnprocessableEntityError('Campo value obrigatório');
      }

      if (task.value > this.target) {
        throw new UnprocessableEntityError('Valor maior que a meta');
      }
    }

    return new Task({
      ...task,
      goalId: this.id,
      value: this.target ? task.value : null,
      type: this.target ? task.type : TaskType.infinite,
      quantity: task.quantity || 1,
    });
  }

  public setScore(score: number): void {
    if (this.target && this.score !== null) {
      this.score = Math.max(0, Math.min(this.target, score));
    }
  }

  public incrementScore(score: number): void {
    if (this.target && this.score !== null) {
      this.setScore(this.score + score);
    }
  }

  public isCompleted(): boolean {
    return this.score === this.target;
  }
}