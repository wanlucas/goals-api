import GoalModel from '../../../infra/model/GoalModel';
import TaskDayModel from '../../../infra/model/TaskDayModel';
import TaskModel from '../../../infra/model/TaskModel';
import { NotFoundError } from '../../constant/HttpError';
import Task, { ITask } from '../../entity/Task';
import sequelize from '../../../infra/db';

export default class Create {
  public async execute(body: ITask) {
    const foundGoal = await GoalModel.findOne({ where: { id: body.goalId } });

    if (!foundGoal) {
      throw new NotFoundError('Meta não encontrada');
    }

    const trx = await sequelize.transaction();

    try {
      const task = new Task(body);
      const days = task.days.map((day) => ({ taskId: task.id, day }));
      
      await TaskModel.create({ ...task }, { transaction: trx });
       
      await TaskDayModel.bulkCreate(days, { transaction: trx });

      await trx.commit();
       
    } catch (error) {
       
      await trx.rollback();
      throw error;
    }
  }
}
