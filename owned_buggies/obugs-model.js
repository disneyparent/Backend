const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
};

function find() {
  return db('owned_buggies')
}

function findBy(filter) {
  return db('owned_buggies').where(filter);
}

function findById(id) {
  return db('owned_buggies')
    .where({ id })
    .first();
}