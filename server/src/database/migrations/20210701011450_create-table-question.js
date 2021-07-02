exports.up = async knex => knex.schema.createTable('question', table => {
  table.increments('id_question').primary()
  table.text('question_enunciation').unique().notNullable()

  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())
});

exports.down = async knex => knex.schema.dropTable('question')
