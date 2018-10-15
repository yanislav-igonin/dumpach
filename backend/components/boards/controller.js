const {
  HttpNotFoundException,
} = require('../../modules').errors;
const Repository = require('./repository');

class Controller {
  static async list(ctx) {
    const repository = new Repository();

    try {
      const sections = await repository.findBoards();

      ctx.body = { data: sections };
    } catch (err) {
      throw new Error(err);
    }
  }

  static async get(ctx) {
    const { boardId } = ctx.params;
    const repository = new Repository();

    try {
      const board = await repository.findBoard(boardId);

      if (!board) {
        throw new HttpNotFoundException('Board not found');
      }

      ctx.body = { data: board };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Controller;
