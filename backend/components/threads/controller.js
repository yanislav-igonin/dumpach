const status = require('http-status');
const { mediaFiles } = require('../../modules');
const {
  HttpNotFoundException,
  HttpBadRequestException,
} = require('../../modules').errors;
const { checkPostValidity } = require('./helpers');
const Repository = require('./repository');

class Controller {
  static async list(ctx) {
    const { boardId } = ctx.params;
    const { limit = 10, offset = 0 } = ctx.query;

    if (isNaN(parseInt(limit, 10)) || isNaN(parseInt(limit, 10))) {
      throw new HttpBadRequestException('Bad query parameters');
    }

    try {
      const repository = new Repository(boardId);
      const board = await repository.findBoard(boardId);

      if (!board) {
        throw new HttpNotFoundException('Board not found');
      }

      const threads = await repository.findThreads(limit, offset);

      const count = await repository.countThreads();

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
      const repository = new Repository(boardId);
      const board = await repository.findBoard(boardId);

      if (!board) {
        throw new HttpNotFoundException('Board not found');
      }

      const thread = await repository.findThread(threadId);

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
      const repository = new Repository(boardId);
      const board = await repository.findBoard(boardId);

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

      const [
        sendedThread,
        sendedPost,
        sendedAttachments,
      ] = await repository.createThread(fields, files, board.threads_limit);

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
      const repository = new Repository(boardId);
      const board = await repository.findBoard(boardId);

      if (!board) {
        throw new HttpNotFoundException('Board not found');
      }

      const thread = await repository.findThread(threadId);

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

      await repository.updateThread(fields, files, thread);

      const sendedThread = await repository.findThread(threadId);

      ctx.body = { data: sendedThread };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Controller;
