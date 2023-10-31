import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import GoalModel from './GoalModel';

export default class BranchModel extends Model {
  declare id: string;
  declare name: string;
  declare userId: string;
  declare xp: number;
  declare icon: string;
  declare goals: GoalModel[];
}

BranchModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: new DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    }
  },
  xp: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Branch',
  sequelize,
});

BranchModel.hasMany(GoalModel, {
  foreignKey: 'branchId',
  as: 'goals',
});

GoalModel.belongsTo(BranchModel, {
  as: 'branch',
});