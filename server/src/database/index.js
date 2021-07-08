import knexfile from '../knexfile.js';
import knex from 'knex';

const db = knex(knexfile.development);

export default db;