const { Board } = require('../models');

module.exports = {
  async list() {
    try {
      const boards = await Board.findAll();

      return boards;
    } catch (err) {
      throw new Error(err);
    }
  },
};
