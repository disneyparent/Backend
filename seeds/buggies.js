
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('buggies').del()
    .then(function () {
      // Inserts seed entries
      return knex('buggies').insert([
        {id: 1, is_double: true, available: false, location: 'Testing'},
        {id: 2, is_double: true, available: false, location: 'Testing'},
        {id: 3, is_double: false, available: false, location: 'Testing'}
      ]);
    });
};
