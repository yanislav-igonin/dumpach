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
const { db } = require('../../db');

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
          id: boardId,
        },
      });

      if (!board) {
        throw new HttpNotFoundException('Board not found');
      }

      const threads = await Thread[board.id].findAll({
        where: {
          board_id: board.id,
        },
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        order: [
          ['updated_at', 'desc'],
          [{ model: Post[board.id], as: 'posts' }, 'created_at', 'desc'],
          [
            { model: Post[board.id], as: 'posts' },
            { model: Attachment[board.id], as: 'attachments' },
            'id',
            'asc',
          ],
        ],
        include: [
          {
            as: 'posts',
            model: Post[board.id],
            include: [
              {
                as: 'attachments',
                model: Attachment[board.id],
              },
            ],
          },
        ],
      });

      const count = await Thread[board.id].count({
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
          id: boardId,
        },
      });

      if (!board) {
        throw new HttpNotFoundException('Board not found');
      }

      const thread = await Thread[board.id].findOne({
        where: {
          board_id: board.id,
          id: threadId,
        },
        order: [
          [{ model: Post[board.id], as: 'posts' }, 'created_at', 'desc'],
          [
            { model: Post[board.id], as: 'posts' },
            { model: Attachment[board.id], as: 'attachments' },
            'id',
            'asc',
          ],
        ],
        include: [
          {
            as: 'posts',
            model: Post[board.id],
            include: [
              {
                as: 'attachments',
                model: Attachment[board.id],
              },
            ],
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
      const board = await Board.findOne({
        where: {
          id: boardId,
        },
        raw: true,
      });

      if (!board) {
        throw new HttpNotFoundException('Board not found');
      }

      const { files, fields } = await mediaFiles.parseFormData(ctx.req);

      // TODO: add max text and title check
      const isPostValid = checkPostValidity(fields, files);

      if (!isPostValid) {
        throw new HttpBadRequestException(
          'Post must contain at least file(s) or text',
        );
      }

      const threads = await Thread[board.id].findAll({
        where: {
          board_id: board.id,
        },
        order: [['updated_at', 'desc']],
      });

      const [sendedThread, sendedPost, sendedAttachments] = await db.transaction(
        async (t) => {
          const thread = await Thread[board.id].create(
            { board_id: board.id },
            { transaction: t },
          );

          const post = await Post[board.id].create(
            { ...fields, thread_id: thread.id },
            { transaction: t },
          );

          const attachmentsFields = await mediaFiles.moveFiles(
            files,
            board.id,
            thread.id,
          );

          const attachments = await Promise.all(
            attachmentsFields.map(attachment => Attachment[board.id].create(
              {
                ...attachment,
                post_id: post.id,
              },
              { transaction: t },
            )),
          );

          if (threads.length > board.threads_limit - 1) {
            const threadsForDelete = threads.slice(49);

            await Promise.all(
              threadsForDelete.map(threadForDelete => Promise.all([
                threadForDelete.destroy({ transaction: t }),
                mediaFiles.removeThreadFiles(boardId, threadForDelete.id),
              ])),
            );
          }

          return [thread.toJSON(), post.toJSON(), attachments];
        },
      );

      sendedPost.attachments = sendedAttachments;
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
      const board = await Board.findOne({
        where: {
          id: boardId,
        },
        raw: true,
      });

      if (!board) {
        throw new HttpNotFoundException('Board not found');
      }

      const thread = await Thread[board.id].findOne({
        where: {
          board_id: board.id,
          id: threadId,
        },
      });

      if (!thread) {
        throw new HttpNotFoundException('Thread not found');
      }

      const { files, fields } = await mediaFiles.parseFormData(ctx.req);

      // TODO: add max text and title check
      const isPostValid = checkPostValidity(fields, files);

      if (!isPostValid) {
        throw new HttpBadRequestException(
          'Post must contain at least file(s) or text',
        );
      }

      await db.transaction(async (t) => {
        const post = await Post[board.id].create(
          { ...fields, thread_id: threadId },
          { transaction: t },
        );

        const attachmentsFields = await mediaFiles.moveFiles(
          files,
          board.id,
          threadId,
        );

        await Promise.all(
          attachmentsFields.map(attachment => Attachment[board.id].create(
            {
              ...attachment,
              post_id: post.id,
            },
            { transaction: t },
          )),
        );

        if (!post.is_sage) {
          thread.changed('updated_at', true);
          await thread.save({ transaction: t });
        }
      });

      const sendedThread = await Thread[board.id].findOne({
        where: {
          board_id: board.id,
          id: threadId,
        },
        order: [
          ['updated_at', 'desc'],
          [{ model: Post[board.id], as: 'posts' }, 'created_at', 'desc'],
          [
            { model: Post[board.id], as: 'posts' },
            { model: Attachment[board.id], as: 'attachments' },
            'id',
            'asc',
          ],
        ],
        include: [
          {
            as: 'posts',
            model: Post[board.id],
            include: [
              {
                as: 'attachments',
                model: Attachment[board.id],
              },
            ],
          },
        ],
      });

      ctx.body = { data: sendedThread };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Controller;
