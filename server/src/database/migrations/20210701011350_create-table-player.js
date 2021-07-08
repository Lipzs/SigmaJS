exports.up = async knex => knex.schema.createTable('player', table => {
  table.increments('id_player').primary();
  table.text('name').notNullable();
  table.text('password').notNullable();
  table.text('email').unique().notNullable();
  table.text('photo');

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = async knex => knex.schema.dropTable('player');