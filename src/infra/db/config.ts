import 'dotenv/config';
import { Sequelize } from 'sequelize';

export default new Sequelize(
  process.env.DB_NAME || 'goals',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: (process.env.DB_PORT as unknown as number) || 3306,
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);
