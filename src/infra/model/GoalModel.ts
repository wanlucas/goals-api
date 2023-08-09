import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/config';
import BranchModel from './BranchModel';

export default class GoalModel extends Model {
  declare id: string;
  declare name: string;
  declare branchId: string;
  declare xp: number;
}

GoalModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  target: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }, 
  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  branchId: {
    type: new DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Branch',
      key: 'id',
    }
  }
}, {
  tableName: 'Goal',
  sequelize,
});

GoalModel.belongsTo(BranchModel, {
  as: 'branch',
});