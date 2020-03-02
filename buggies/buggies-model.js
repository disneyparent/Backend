const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findBy,
  update,
  findById,
  remove
};

function find() {
  return db('buggies')
}

function findBy(filter) {
  return db('buggies').where(filter);
}

function update(id, changes){
    return db('tasks')
        .where({ id })
        .update(changes)
}

function findById(id) {
  return db('buggies')
    .where({ id })
    .first();
}

function remove(id){
    return db('tasks')
        .where({ id })
        .del()
}