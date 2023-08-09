import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/config';
import BranchModel from './BranchModel';

export default class UserModel extends Model {
  declare id: string;
  declare name: string;
  declare password: string;
}

UserModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'User',
  sequelize,
});

UserModel.hasMany(BranchModel, {
  foreignKey: 'userId',
  as: 'branchs',
});
  