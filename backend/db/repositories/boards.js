const { Board } = require('../models');

module.exports = {
  async list() {
    const boards = await Board.findAll();

    return boards;
  },
};
