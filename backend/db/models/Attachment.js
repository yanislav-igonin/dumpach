const Sequelize = require('sequelize');
const db = require('../connection');
const {
  data: { boards },
} = require('../seeders');

const generateModels = () => {
  const attachmentModels = {};

  boards.forEach((board) => {
    attachmentModels[board.id] = db.define(
      `${board.id}_attachments`,
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
        uuid: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        size: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      { underscored: true },
    );
  });

  return attachmentModels;
};

const Attachment = generateModels();

module.exports = Attachment;
