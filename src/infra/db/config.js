require('dotenv/config');

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 3306,
  port: process.env.DB_PORT,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database:  process.env.DB_NAME || 'goals',
  define: {
    timestamps: true,
    underscored: true,
  }
};


