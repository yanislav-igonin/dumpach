const Sequelize = require('sequelize');
const db = require('../connection');
const Post = require('./Post')

const Thread = db.define(
  'threads',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { underscored: true },
);

Thread.hasMany(Post)

module.exports = Thread;
