
exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments()
      users
      .string('username', 255)
      .notNullable()
      .unique()
      users.string('password', 255).notNullable();
    })
    .createTable('buggies', buggies => {
      buggies.increments()
      buggies.boolean('is_double').defaultTo(false)
      buggies.boolean('available').defaultTo(true)
      buggies.string('location').notNullable().notNullable()
    })
    .createTable('user_buggies', obuggies => {
      obuggies.increments()
      obuggies.integer('user_id').unsigned().references('users.id')
      obuggies.integer('buggie_id').unsigned().references('buggies.id').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_buggies')
    .dropTableIfExists('buggies')
    .dropTableIfExists('users')
};
