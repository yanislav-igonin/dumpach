const Board = require('../models/Board')

module.exports = {
  async list() {
    const boards = await Board.findAll();

    return boards;
  },
};
