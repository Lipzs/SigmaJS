const { alternatives } = require('../../consts/const.js');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('alternative').del()
    .then(function () {
      // Inserts seed entries
      return knex('alternative').insert(alternatives);
    });
};
