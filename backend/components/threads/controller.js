const { Board, Thread, Post } = require('../../db/models');

class Controller {
  static async get(ctx) {
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
}

module.exports = Controller;
