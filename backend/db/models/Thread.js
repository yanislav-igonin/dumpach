const Sequelize = require('sequelize');
const db = require('../connection');
const Post = require('./Post');
const Attachment = require('./Attachment');

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

Thread.hasMany(Post, { foreignKey: 'thread_id', onDelete: 'cascade' });
Thread.hasMany(Attachment, { foreignKey: 'thread_id' });

module.exports = Thread;
