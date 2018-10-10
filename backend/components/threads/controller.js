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
// TODO: think how to make different table for every board.
// maybe add another table or parameter, that will count
// post numeric id for every board, so i dont need some other tables
// to save same entity

class Controller {
  static async list(ctx) {
    const { boardId } = ctx.params;
    const { limit = 10, offset = 0 } = ctx.query;

    if (isNaN(parseInt(limit, 10)) || isNaN(parseInt(limit, 10))) {
      throw new HttpBadRequestException('Bad query parameters');
    }

    try {
      const board = await Board.findOne({
        where: {
          identifier: boardId,
        },
      });

      if (!board) {
        throw new HttpNotFoundException('Board not found');
      }

      const threads = await Thread.findAll({
        where: {
          board_id: board.id,
        },
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        order: [
          ['updated_at', 'desc'],
          [Post, 'created_at', 'desc'],
          [Post, Attachment, 'id', 'asc'],
        ],
        include: [
          {
            model: Post,
            include: [Attachment],
          },
        ],
      });

      const count = await Thread.count({
        where: {
          board_id: board.id,
        },
      });

      const slicedPostsThreads = threads.map((thread) => {
        if (thread.posts.length < 5) {
          return { ...thread.toJSON(), remained_posts: 0 };
        }

        const posts = [];

        posts.push(thread.posts[0]);
        posts.push(thread.posts[thread.posts.length - 1]);
        posts.push(thread.posts[thread.posts.length - 2]);
        posts.push(thread.posts[thread.posts.length - 3]);

        return {
          ...thread.toJSON(),
          posts,
          remained_posts: thread.posts.length - 4,
        };
      });

      const isLastPage = threads.length < offset;

      ctx.body = {
        data: slicedPostsThreads,
        count,
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
        throw new HttpNotFoundException('Board not found');
      }

      const thread = await Thread.findOne({
        where: {
          board_id: board.id,
          id: threadId,
        },
        order: [[Post, 'created_at', 'desc'], [Post, Attachment, 'id', 'asc']],
        include: [
          {
            model: Post,
            include: [Attachment],
          },
        ],
      });

      if (!thread) {
        throw new HttpNotFoundException('Thread not found');
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
        throw new HttpNotFoundException('Board not found');
      }

      const isPostValid = checkPostValidity(fields, files);

      if (!isPostValid) {
        throw new HttpBadRequestException(
          'Post must contain at least file(s) or text',
        );
      }

      const threads = await Thread.findAll({
        where: {
          board_id: board.id,
        },
        order: [['updated_at', 'desc']],
      });

      // TODO: all boards limit 50; separate limit for every board stored in db
      // TODO: add transaction for this functional
      if (threads.length > 49) {
        const threadsForDelete = threads.slice(49);

        await Promise.all(
          threadsForDelete.map(threadForDelete => Promise.all([
            threadForDelete.destroy(),
            mediaFiles.deleteThreadFiles(boardId, threadForDelete.id),
          ])),
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
        throw new HttpNotFoundException('Board not found');
      }

      const thread = await Thread.findOne({
        where: {
          board_id: board.id,
          id: threadId,
        },
        raw: true,
      });

      if (!thread) {
        throw new HttpNotFoundException('Thread not found');
      }

      const isPostValid = checkPostValidity(fields, files);

      if (!isPostValid) {
        throw new HttpBadRequestException(
          'Post must contain at least file(s) or text',
        );
      }

      // TODO: add transaction for this functional
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
        order: [[Post, 'created_at', 'desc'], [Post, Attachment, 'id', 'asc']],
        include: [
          {
            model: Post,
            include: [Attachment],
          },
        ],
      });

      if (!post.is_sage) {
        sendedThread.changed('updated_at', true);
        await sendedThread.save();
      }

      ctx.body = { data: sendedThread };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Controller;
