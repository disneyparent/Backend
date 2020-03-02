
exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
        users.increments();

        users
        .string('username', 255)
        .notNullable()
        .unique();
        users.string('password', 255).notNullable();
    })
    .createTable('buggies', buggies => {
        buggies.increments()

        buggies.boolean('is_double').defaultTo(false)
        buggies.boolean('is_taken').defaultTo(false)
        buggies.string('location').notNullable()
    })
    .createTable('owned_buggies', buggies => {
        buggies.increments()
        buggies.integer('user_id').unsigned().references('user.id')
        buggies.integer('buggie_id').unsigned().references('buggie.id')
        buggies.boolean('active').defaultTo(true)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
