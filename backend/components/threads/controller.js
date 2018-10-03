const status = require('http-status');
const { mediaFiles } = require('../../modules');
const {
  Board, Thread, Post, Attachment,
} = require('../../db').models;
const {
  HttpNotFoundException,
  HttpBadRequestException,
} = require('../../modules').errors;
const { checkPostValidity } = require('./helpers');

// TODO: maybe add repositories for easier testing

class Controller {
  static async list(ctx) {
    const { boardId } = ctx.params;
    // TODO: add query type checking, maybe via ajv
    const { limit = 10, offset = 0 } = ctx.query;

    try {
      const board = await Board.findOne({
        where: {
          identifier: boardId,
        },
      });

      if (!board) {
        throw new HttpNotFoundException('Board not found!');
      }

      // TODO: make separate thread and posts finding
      // TODO: make only 1st and last 3 posts finding
      // TODO: add remained posts count field
      const threadsAndCount = await Thread.findAndCountAll({
        where: {
          board_id: board.id,
        },
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        order: [['updated_at', 'desc']],
        include: [
          {
            model: Post,
            limit: 4,
            // TODO: add attachments create ordering
            // maybe, need to rewrite this in separate queries
            include: [Attachment],
          },
        ],
      });

      const isLastPage = threadsAndCount.rows.length < offset;

      ctx.body = {
        data: threadsAndCount.rows,
        count: threadsAndCount.count,
        is_last_page: isLastPage,
      };
    } catch (err) {
      throw err;
    }
  }

  static async get(ctx) {
    const { boardId, threadId } = ctx.params;

    try {
      const board = await Board.findOne({
        where: {
          identifier: boardId,
        },
      });

      if (!board) {
        throw new HttpNotFoundException('Board not found!');
      }

      const thread = await Thread.findOne({
        where: {
          board_id: board.id,
          id: threadId,
        },
        order: [[Post, 'created_at', 'desc']],
        include: [
          {
            model: Post,
            // TODO: add attachments create ordering
            // maybe, need to rewrite this in separate queries
            include: [Attachment],
          },
        ],
      });

      if (!thread) {
        throw new HttpNotFoundException('Thread not found!');
      }

      ctx.body = { data: thread };
    } catch (err) {
      throw err;
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

      if (!board) {
        throw new HttpNotFoundException('Board not found!');
      }

      const isPostValid = checkPostValidity(fields, files);

      if (!isPostValid) {
        throw new HttpBadRequestException(
          'Post must contain at least file(s) or text!',
        );
      }

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
      throw err;
    }
  }

  static async update(ctx) {
    const { boardId, threadId } = ctx.params;

    try {
      const { files, fields } = await mediaFiles.parseFormData(ctx.req);

      const board = await Board.findOne({
        where: {
          identifier: boardId,
        },
        raw: true,
      });

      if (!board) {
        throw new HttpNotFoundException('Board not found!');
      }

      const thread = await Thread.findOne({
        where: {
          board_id: board.id,
          id: threadId,
        },
        raw: true,
      });

      if (!thread) {
        throw new HttpNotFoundException('Thread not found!');
      }

      const isPostValid = checkPostValidity(fields, files);

      if (!isPostValid) {
        throw new HttpBadRequestException(
          'Post must contain at least file(s) or text!',
        );
      }

      const post = await Post.create({ ...fields, thread_id: threadId });

      const attachmentsFields = await mediaFiles.moveFiles(
        files,
        board.identifier,
        threadId,
      );

      await Promise.all(
        attachmentsFields.map(attachment => Attachment.create({
          ...attachment,
          post_id: post.id,
        })),
      );

      const sendedThread = await Thread.findOne({
        where: {
          board_id: board.id,
          id: threadId,
        },
        order: [[Post, 'created_at', 'desc']],
        include: [
          {
            model: Post,
            // TODO: add attachments create ordering
            // maybe, need to rewrite this in separate queries
            include: [Attachment],
          },
        ],
      });

      sendedThread.changed('updated_at', true);
      await sendedThread.save();

      ctx.body = { data: sendedThread };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Controller;
