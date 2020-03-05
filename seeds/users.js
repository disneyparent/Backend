
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'tyler', password: 'tyler'},
        {id: 2, username: 'katrina', password: 'katrina'},
        {id: 3, username: 'tylerk', password: 'tylerk'}
      ]);
    });
};
