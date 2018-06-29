const Sequelize = require('sequelize');
const db = require('../connection');

const Post = db.define(
  'posts',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.TEXT,
    },
    text: {
      type: Sequelize.TEXT,
    },
    is_sage: {
      type: Sequelize.BOOLEAN,
    },
  },
  { underscored: true },
);

module.exports = Post;
