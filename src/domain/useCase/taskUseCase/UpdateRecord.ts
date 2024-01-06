import db from '../../../infra/db';
import moment from 'moment';
import Task, { ITask, TaskType } from '../../entity/Task';
import { TaskRecord } from '@prisma/client';
import goalUseCase from '../goalUseCase';
import Goal from '../../entity/Goal';
import { NotFoundError, UnauthorizedError } from '../../constant/HttpError';

export default class UpdateRecord {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  private async cumulativeDone(task: Task) {
    if (!task.value) {
      throw new UnauthorizedError('Campo value inexistente');
    }

    if (!task.goalId) {
      throw new NotFoundError('Tarefa não está associada a uma meta');
    }

    const foundGoal = await goalUseCase.findById(task.goalId);
    const goal = new Goal(foundGoal);

    goal.incrementScore(task.value);

    if (goal.isCompleted()) {
      await db.task.update({
        where: {
          id: task.id,
        },
        data: {
          completedAt: moment().format('YYYY-MM-DD'),
        },
      });
    }

    await goalUseCase.update(goal.id, goal);
  }

  private async cumulativeUndone(task: Task) {
    // TODO: remove this
    if (!task.value) {
      throw new UnauthorizedError('Campo value inexistente');
    }

    if (!task.goalId) {
      throw new NotFoundError('Tarefa não está associada a uma meta');
    }

    const foundGoal = await goalUseCase.findById(task.goalId);
    const goal = new Goal(foundGoal);

    goal.incrementScore(-task.value);

    await db.task.update({
      where: {
        id: task.id,
      },
      data: {
        completedAt: null,
      },
    });

    await goalUseCase.update(goal.id, goal);
  }

  private async crescentDone(task: Task) {
    // TODO: remove this
    if (!task.value) {
      throw new UnauthorizedError('Campo value inexistente');
    }

    if (!task.goalId) {
      throw new NotFoundError('Tarefa não está associada a uma meta');
    }

    const foundGoal = await goalUseCase.findById(task.goalId);
    const goal = new Goal(foundGoal);

    goal.setScore(task.value);

    if (goal.isCompleted()) {
      await db.task.update({
        where: {
          id: task.id,
        },
        data: {
          completedAt: moment().format('YYYY-MM-DD'),
        },
      });
    } else {
      task.setValue(Math.min(task.value + task.increment!, goal.target!));

      await db.task.update({
        where: {
          id: task.id,
        },
        data: task,
      });
    }

    await goalUseCase.update(goal.id, goal);
  }

  private async crescentUndone(task: Task) {
    // TODO: remove this
    if (!task.value) {
      throw new UnauthorizedError('Campo value inexistente');
    }

    if (!task.goalId) {
      throw new NotFoundError('Tarefa não está associada a uma meta');
    }

    const foundGoal = await goalUseCase.findById(task.goalId);
    const goal = new Goal(foundGoal);

    goal.incrementScore(-task.increment!);
    console.log(goal);
    
    await goalUseCase.update(goal.id, goal);
  }

  public async execute(taskId: string, record: Partial<TaskRecord>): Promise<void> {
    const today = moment().format('YYYY-MM-DD');
    const foundTask = await db.task.findUnique({
      include: {
        records: {
          where: {
            date: today,
          },
        },
      },
      where: {
        id: taskId,
      },
    });

    if (!foundTask) throw new NotFoundError('Tarefa não encontrada');

    const foundRecord = foundTask?.records[0] || {};
    const task = new Task(foundTask as ITask);
    const taskRecord = task.createRecord({
      ...foundRecord,
      ...record,
      date: today,
    });

    if (!taskRecord.duration && !taskRecord.quantity) {
      await db.taskRecord.delete({
        where: {
          taskId_date: {
            taskId,
            date: today,
          },
        },
      });
    } else {
      await db.taskRecord.upsert({
        where: {
          taskId_date: {
            taskId,
            date: today,
          },
        },
        update: taskRecord,
        create: taskRecord,
      });
    }

    if (taskRecord.done) {
      switch (task.type) {
      case TaskType.cumulative:
        await this.cumulativeDone(task);
        break;
      case TaskType.crescent:
        await this.crescentDone(task);
        break;
      }
    } else if (foundRecord.done) {
      switch (task.type) {
      case TaskType.cumulative:
        await this.cumulativeUndone(task);
        break;
      case TaskType.crescent:
        await this.crescentUndone(task);
        break;
      }
    }
  }
}
