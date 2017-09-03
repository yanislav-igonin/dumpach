const pgp = require('pg-promise')();
const config = require('../../../../config/config');

const cn = {
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
};

const db = pgp(cn);

module.exports = db;
