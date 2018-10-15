const Sequelize = require('sequelize');
const db = require('../connection');
const Thread = require('./Thread');
const boards = require('../seeders/boards');

const Board = db.define(
  'boards',
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    threads_limit: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true },
);

boards.forEach((board) => {
  Board.hasMany(Thread[board.id], { foreignKey: 'board_id', onDelete: 'cascade' });
});

module.exports = Board;

// TODO: add allowed sage
// TODO: add allowed attachments
// TODO: add thread bump limit
