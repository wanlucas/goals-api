import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

export default class TaskModel extends Model {
  declare id: string;
  declare description: string;
  declare goalId: string;
  declare endDate?: Date;
  declare quantity?: number;
  declare duration?: number;
}

TaskModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goalId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Goal',
      key: 'id',
    }
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
},  {
  tableName: 'Task',
  sequelize,
});

