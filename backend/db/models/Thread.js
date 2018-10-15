const Sequelize = require('sequelize');
const db = require('../connection');
const Post = require('./Post');
const boards = require('../seeders/boards');

const generateModels = () => {
  const threadModels = {};

  boards.forEach((board) => {
    const model = db.define(
      `${board.id}_threads`,
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        board_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      { underscored: true },
    );

    model.hasMany(Post[board.id], {
      as: 'posts',
      foreignKey: 'thread_id',
      onDelete: 'cascade',
    });

    threadModels[board.id] = model;
  });

  return threadModels;
};

const Thread = generateModels();

module.exports = Thread;
