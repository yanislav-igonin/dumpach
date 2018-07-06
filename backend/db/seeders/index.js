const { Board } = require('../models');
const boards = require('./boards');

const seedAll = async () => {
  const dbBoards = await Board.findAll();
  if (dbBoards.length === 0) {
    return Board.bulkCreate(boards);
  }
};

module.exports = seedAll;
