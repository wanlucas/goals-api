import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

export default class TaskDayModel extends Model {
  declare taskId: string;
  declare day: number;
}

TaskDayModel.init({
  taskId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Task',
      key: 'id',
    }
  },
  day: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  }
},  {
  tableName: 'TaskDay',
  sequelize,
});

