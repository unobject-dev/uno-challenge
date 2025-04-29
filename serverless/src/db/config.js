require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'todo',
    password: process.env.DB_PASS || 'todo',
    database: process.env.DB_NAME || 'tododb',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
  },
};
