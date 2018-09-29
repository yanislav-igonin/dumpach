const status = require('http-status');
const { mediaFiles } = require('../../modules');
const {
  Board, Thread, Post, Attachment,
} = require('../../db').models;

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

    try {
      const { files, fields } = await mediaFiles.parseFormData(ctx.req);

      const board = await Board.findOne({
        where: {
          identifier: boardId,
        },
        raw: true,
      });

      const thread = await Thread.create({ board_id: board.id });

      const post = await Post.create({ ...fields, thread_id: thread.id });

      const attachmentsFields = await mediaFiles.moveFiles(
        files,
        board.identifier,
        thread.id,
      );

      const attachments = await Promise.all(
        attachmentsFields.map(attachment => Attachment.create({
          ...attachment,
          post_id: post.id,
        })),
      );

      const sendedThread = thread.toJSON();
      const sendedPost = post.toJSON();

      sendedPost.attachments = attachments;
      sendedThread.posts = [];
      sendedThread.posts.push(sendedPost);

      ctx.status = status.CREATED;
      ctx.body = { data: sendedThread };
    } catch (err) {
      throw new Error(err);
    }
  }

  static async update(ctx) {
    const { boardId, threadId } = ctx.params;

    ctx.body = { data: `${boardId} THREAD ${threadId} UPDATE` };
  }
}

module.exports = Controller;
