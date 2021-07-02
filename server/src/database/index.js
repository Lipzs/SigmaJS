import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.USUARIO,
    password: process.env.SENHA,
    database: process.env.DATABASE
  }
});

export default db;