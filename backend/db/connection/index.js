const Sequelize = require('sequelize');

const config = require('../../config');

const sequelize = new Sequelize(...Object.values(config.db));

module.exports = sequelize;
