const connection = require('./connection');
const models = require('./models');
const seeders = require('./seeders');

module.exports = {
  db: connection,
  models,
  seeders,
};
