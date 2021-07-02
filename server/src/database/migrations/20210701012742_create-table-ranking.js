exports.up = async knex => knex.schema.createTable('ranking', table => {
  table.increments('id_ranking').primary()
  table.text('player_name').notNullable()
  table.integer('scores').notNullable()
  table.integer('id_player')
  .references('player.id_player')
  .notNullable()
  .onDelete('CASCADE')

  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())
});

exports.down = async knex => knex.schema.dropTable('ranking')