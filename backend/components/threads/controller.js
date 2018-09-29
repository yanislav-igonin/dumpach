const status = require('http-status');
// const { mediaFiles } = require('../../modules');
const { Board, Thread, Post } = require('../../db').models;

// TODO: maybe add repositories for easier testing

class Controller {
  static async list(ctx) {
    const { boardId } = ctx.params;

    try {
      const board = await Board.findOne({
        where: {
          identifier: boardId,
        },
      });

      // TODO: add posts updated_at ordering
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

      // TODO: add posts updated_at ordering
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

  static async create(ctx) {
    const { boardId } = ctx.params;

    // const { files, fields } = await mediaFiles.parseFormData(ctx.req);

    // console.log(fields);
    // console.log(files);

    ctx.status = status.CREATED;
    ctx.body = { data: `${boardId} THREAD CREATED` };
  }

  static async update(ctx) {
    const { boardId, threadId } = ctx.params;

    ctx.body = { data: `${boardId} THREAD ${threadId} UPDATE` };
  }
}

module.exports = Controller;
