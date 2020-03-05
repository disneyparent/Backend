
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_buggies').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_buggies').insert([
        {id: 1, user_id: 1, buggie_id: 1},
        {id: 2, user_id: 2, buggie_id: 2}
      ]);
    });
};
