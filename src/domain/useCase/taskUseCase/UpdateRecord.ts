import db from '../../../infra/db';
import moment from 'moment';
import Task, { ITask, TaskType } from '../../entity/Task';
import { TaskRecord } from '@prisma/client';
import goalUseCase from '../goalUseCase';
import Goal from '../../entity/Goal';
import { NotFoundError, UnauthorizedError } from '../../constant/HttpError';
import taskUseCase from '.';

export default class UpdateRecord {
  constructor() {
    this.execute.bind(this);
  }

  private async cumulativeAggregation(task: Task) {
    if (!task.value) {
      throw new UnauthorizedError('Campo value inexistente');
    }

    if (!task.goalId) {
      throw new NotFoundError('Tarefa não está associada a uma meta');
    }

    const foundGoal = await goalUseCase.findById(task.goalId);
    const goal = new Goal(foundGoal);

    goal.addScore(task.value);

    if (goal.isCompleted()) {
      await taskUseCase.remove(task.id);
    }

    await db.goal.update({
      where: {
        id: goal.id,
      },
      data: goal,
    });

    return task;
  }

  private async crescentAggregation(task: Task) {
    if (!task.value) {
      throw new UnauthorizedError('Campo value inexistente');
    }

    if (!task.goalId) {
      throw new NotFoundError('Tarefa não está associada a uma meta');
    }

    const foundGoal = await goalUseCase.findById(task.goalId);
    const goal = new Goal(foundGoal);

    task.setValue(
      Math.min(task.value + task.increment!, goal.target!)
    );

    goal.setScore(task.value);

    if (goal.isCompleted()) {
      await taskUseCase.remove(task.id);
    } else {
      await db.task.update({
        where: {
          id: task.id,
        },
        data: task,
      });
    }

    await db.goal.update({
      where: {
        id: goal.id,
      },
      data: goal,
    });
  }

  public async execute(
    taskId: string,
    record: Partial<TaskRecord>
  ): Promise<void> {
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
        deletedAt: null,
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
        await this.cumulativeAggregation(task);
        break;
      case TaskType.crescent:
        await this.crescentAggregation(task);
        break;
      }
    }
  }
}
