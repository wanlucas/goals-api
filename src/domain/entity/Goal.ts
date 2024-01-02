import Entity, { IEntity } from './Entity';
import Joi from 'joi';
import Task, { ITask } from './Task';

const goalSchema = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string().min(3).max(200).required(),
  target: Joi.number().min(1),
  score: Joi.number().min(0).max(Joi.ref('target')),
  difficulty: Joi.number().min(1).max(10).required(),
  branchId: Joi.string().uuid().required(),
});

export interface IGoal extends IEntity {
  description: string;
  target?: number ;
  score?: number;
  branchId: string;
  difficulty: number;
}

export default class Goal extends Entity {
  public readonly description: string;
  public readonly target: number | null;
  public readonly branchId: string;
  public readonly difficulty: number;
  public score: number | null;

  public constructor (body: IGoal) {
    super(body, goalSchema);

    this.description = body.description;
    this.target = body.target || null;
    this.branchId = body.branchId;
    this.difficulty = body.difficulty;
    this.score = body.score || null;
  }

  public createTask(task: ITask): Task {
    return new Task({
      ...task,
      goalId: this.id,
      value: this.target ? task.value : null,
      quantity: task.quantity || 1,
    });
  }

  public updateScore(score: number): void {
    if (this.target && this.score) {
      this.score = Math.min(this.target, this.score + score);
    }
  }

  public isCompleted(): boolean {
    return this.score === this.target;
  }

  public getXp(): number {
    return this.difficulty * 21.21;
  }
}