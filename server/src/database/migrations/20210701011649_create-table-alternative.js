exports.up = async knex => knex.schema.createTable('alternative', table => {
  table.increments('id_alternative').primary();
  table.integer('alternative_value').notNullable();
  table.boolean('correct').notNullable();
  table.integer('id_question')
    .references('question.id_question')
    .notNullable()
    .onDelete('CASCADE');

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = async knex => knex.schema.dropTable('alternative');

