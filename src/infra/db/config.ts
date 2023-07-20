import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

export default knex({
  client: 'mysql2',
  connection: {
    host: process.env.HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: { min: 0, max: 10 },
});
