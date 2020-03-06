const db = require('../database/dbConfig.js')

module.exports = {
  find,
  findBy,
  update,
  addBuggie,
  findById,
  pickupBuggie,
  findPickedUp,
  remove
};

function find() {
  return db('buggies')
}

function findBy(filter) {
  return db('buggies').where(filter);
}

function update (id, changes){
    return db('buggies')
      .where({ id })
      .update(changes)

}

function findById(id) {
  return db('buggies')
    .where({ id })
    .first();
}

function findPickedUp() {
  return db('user_buggies')
}

function pickupBuggie(userid, bugid){
  return db('user_buggies')
      .insert({ ...userid, buggie_id: bugid })
}

function addBuggie(buggie){
  return db('buggies')
      .insert(buggie, 'id')
}

function remove(id){
    return db('buggies')
        .where({ id })
        .del()
}