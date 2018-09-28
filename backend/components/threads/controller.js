const { Board, Thread, Post } = require('../../db').models;

class Controller {
  static async list(ctx) {
    const { boardId } = ctx.params;

    try {
      const board = await Board.findOne({
        where: {
          identifier: boardId,
        },
      });

      const threads = await Thread.findAll({
        where: {
          board_id: board.id,
        },
        order: [['updated_at', 'desc']],
        include: [
          {
            model: Post,
            limit: 4,
          },
        ],
      });

      ctx.body = { data: threads };
    } catch (err) {
      throw new Error(err);
    }
  }

  static async get(ctx) {
    const { boardId, threadId } = ctx.params;

    try {
      const board = await Board.find({
        where: {
          identifier: boardId,
        },
      });

      const thread = await Thread.findOne({
        where: {
          board_id: board.id,
          id: threadId,
        },
        // order: [['updated_at', 'desc']],
        include: [
          {
            model: Post,
          },
        ],
      });

      ctx.body = { data: thread };
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Controller;
