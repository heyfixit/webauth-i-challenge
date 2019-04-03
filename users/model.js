const db = require('../data/dbConfig.js');

const get = () => db('users');

const getById = id =>
  db('users')
    .where({ 'users.id': id })
    .first();

const getByUsername = username =>
  db('users')
    .where({ username })
    .first();

const insert = user =>
  db('users')
    .insert(user)
    .then(ids => getById(ids[0]));

const update = (id, changes) =>
  db('users')
    .where({ id })
    .update(changes)
    .then(() => getById(id));

const remove = id =>
  db('users')
    .where({ id })
    .del();

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  getByUsername
};
