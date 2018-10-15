const Sequelize = require('sequelize');
const db = require('../connection');
const Attachment = require('./Attachment');
const boards = require('../seeders/boards');

const generateModels = () => {
  const postsModels = {};

  boards.forEach((board) => {
    const model = db.define(
      `${board.id}_posts`,
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

    model.hasMany(Attachment[board.id], {
      as: 'attachments',
      foreignKey: 'post_id',
      onDelete: 'cascade',
    });

    postsModels[board.id] = model;
  });

  return postsModels;
};

const Posts = generateModels();

module.exports = Posts;
