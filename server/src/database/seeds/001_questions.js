
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('question').del()
    .then(function () {
      // Inserts seed entries
      return knex('question').insert([
        {id_question: 1,question_enunciation: 'Quanto é 1 + 1'},
        {id_question: 2,question_enunciation: 'Quanto é 2 + 2'}
      ]);
    });
};
