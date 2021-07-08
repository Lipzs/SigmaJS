require('dotenv').config()

module.exports ={
  development: {
    client: 'pg',
    connection: {
      host: process.env.HOST,
      user: process.env.USUARIO,
      password: process.env.SENHA,
      database: process.env.DATABASE,
      connectTimeout: 90000
    },
    migrations: {
      tableName: 'knex_tables',
      directory: `${__dirname}/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/database/seeds`
    }
  }
};