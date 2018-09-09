const Sequelize = require('sequelize');
const db = require('../connection');
const Thread = require('./Thread');

const Board = db.define(
  'boards',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    identifier: {
      type: Sequelize.STRING,
      unique: true,
    },
    title: {
      type: Sequelize.STRING,
      unique: true,
    },
  },
  { underscored: true },
);

Board.hasMany(Thread, { foreignKey: 'board_id', onDelete: 'cascade' });

module.exports = Board;
