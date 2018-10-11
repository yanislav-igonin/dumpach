const Sequelize = require('sequelize');
const db = require('../connection');
const Attachment = require('./Attachment');

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
      defaultValue: '',
    },
    text: {
      type: Sequelize.TEXT,
      defaultValue: '',
    },
    is_sage: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { underscored: true },
);

Post.hasMany(Attachment, { foreignKey: 'post_id', onDelete: 'cascade' });

module.exports = Post;
