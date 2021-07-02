const { questions } = require('../../consts/const.js');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('question').del()
    .then(function () {
      // Inserts seed entries
      return knex('question').insert(questions);
    });
};
