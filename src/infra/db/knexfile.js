module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '364',
    database: 'goals',
  },
  migrations: {
    extension: 'ts',
    directory: './migrations',
    tableName: 'migrations_history',
  }
};
