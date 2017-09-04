const promise = require('bluebird');

const options = {
  promiseLib: promise,

  error(error, e) {
    if (e.cn) {
      // A connection-related error;
      console.log('CN:', e.cn);
      console.log('EVENT:', error.message);
    }
  },
};

const pgp = require('pg-promise')(options);
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
