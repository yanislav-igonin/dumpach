const Sequelize = require('sequelize');
const db = require('../connection');

const Attachment = db.define(
  'attachments',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true },
);

module.exports = Attachment;
