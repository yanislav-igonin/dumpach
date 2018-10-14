const Sequelize = require('sequelize');
const db = require('../connection');

// const Attachment = db.define(
//   'attachments',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     uuid: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     type: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     size: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//   },
//   { underscored: true },
// );

// module.exports = Attachment;

const generateModels = () => {
  const boards = ['b', 'dev'];
  const postsModels = {};

  boards.forEach((board) => {
    postsModels[board] = db.define(
      `${board}_attachments`,
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

  return postsModels;
};

const Posts = generateModels();

module.exports = Posts;
