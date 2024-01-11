import db from '../../../infra/db';
import Task, { ITask, TaskType } from '../../entity/Task';
import { TaskRecord } from '@prisma/client';
import goalUseCase from '../goalUseCase';
import Goal from '../../entity/Goal';
import { NotFoundError, UnauthorizedError } from '../../constant/HttpError';
import DateTime from '../../entity/DateTime';

export default class UpdateRecord {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  private async cumulativeDone(task: Task) {
    if (!task.value) {
      throw new UnauthorizedError('Campo value inexistente');
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
          completedAt: new DateTime(),
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

    const foundGoal = await goalUseCase.findById(task.goalId);
    const goal = new Goal(foundGoal);

    goal.setScore(task.value);

    if (goal.isCompleted()) {
      await db.task.update({
        where: {
          id: task.id,
        },
        data: {
          completedAt: new DateTime(),
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

    const foundGoal = await goalUseCase.findById(task.goalId);
    const goal = new Goal(foundGoal);

    goal.incrementScore(-task.increment!);
    
    await goalUseCase.update(goal.id, goal);
  }

  public async execute(taskId: string, record: Partial<TaskRecord>): Promise<void> {
    const today = new DateTime();

    const foundTask = await db.task.findUnique({
      include: {
        records: {
          where: {
            date: {
              gte: today.startOfDay(),
              lte: today.endOfDay(),
            },
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
