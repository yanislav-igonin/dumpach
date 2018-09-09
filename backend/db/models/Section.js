const Sequelize = require('sequelize');
const db = require('../connection');
const Board = require('./Board');

const Section = db.define(
  'section',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      unique: true,
    },
  },
  { underscored: true },
);

Section.hasMany(Board, { foreignKey: 'section_id', onDelete: 'cascade' });

module.exports = Section;
