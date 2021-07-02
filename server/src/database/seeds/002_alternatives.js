
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('alternative').del()
    .then(function () {
      // Inserts seed entries
      return knex('alternative').insert([
        {alternative_value: '2', correct: true, id_question: 1},
        {alternative_value: '3', correct: false, id_question: 1},
        {alternative_value: '1', correct: false, id_question: 1},
        {alternative_value: '4', correct: true, id_question: 2},
        {alternative_value: '2', correct: false, id_question: 2},
        {alternative_value: '1', correct: false, id_question: 2},
      ]);
    });
};
