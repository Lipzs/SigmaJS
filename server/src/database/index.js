import knex from 'knex';

require('dotenv').config();

const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.HOST,
    user: process.env.USUARIO,
    password: process.env.SENHA,
    database: process.env.DATABASE
  }
});

export default db;