const Sequelize = require('sequelize');
const db = require('../connection');
const Post = require('./Post');

// const Thread = db.define(
//   'threads',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//   },
//   { underscored: true },
// );

// Thread.hasMany(Post, { foreignKey: 'thread_id', onDelete: 'cascade' });

const generateModels = () => {
  const boards = ['b', 'dev'];
  const threadsModels = {};

  boards.forEach((board) => {
    const model = db.define(
      `${board}_threads`,
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

    model.hasMany(Post[board], {
      as: 'b_posts',
      foreignKey: 'thread_id',
      onDelete: 'cascade',
    });

    threadsModels[board] = model;
  });

  return threadsModels;
};

const Threads = generateModels();

module.exports = Threads;
