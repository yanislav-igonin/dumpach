const Sequelize = require('sequelize');
const db = require('../connection');
const Thread = require('./Thread');

const Board = db.define(
  'boards',
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  { underscored: true },
);

Board.hasMany(Thread, { foreignKey: 'board_id', onDelete: 'cascade' });

module.exports = Board;
