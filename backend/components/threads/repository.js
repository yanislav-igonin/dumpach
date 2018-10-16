const {
  Board, Thread, Post, Attachment,
} = require('../../db').models;
const { db } = require('../../db');
const { mediaFiles } = require('../../modules');

class Repository {
  constructor(boardId) {
    this.boardId = boardId;
    this.boardModel = Board;
    this.model = Thread[boardId];
    this.postModel = Post[boardId];
    this.attachmentModel = Attachment[boardId];
  }

  findBoard() {
    const { boardId } = this;

    return this.boardModel.findOne({
      where: {
        id: boardId,
      },
    });
  }

  findThreads(limit = 10, offset = 0) {
    const {
      boardId, model, postModel, attachmentModel,
    } = this;

    return model.findAll({
      where: {
        board_id: boardId,
      },
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [
        ['updated_at', 'desc'],
        [{ model: postModel, as: 'posts' }, 'created_at', 'desc'],
        [
          { model: postModel, as: 'posts' },
          { model: attachmentModel, as: 'attachments' },
          'id',
          'asc',
        ],
      ],
      include: [
        {
          as: 'posts',
          model: postModel,
          include: [
            {
              as: 'attachments',
              model: attachmentModel,
            },
          ],
        },
      ],
    });
  }

  countThreads() {
    const { boardId, model } = this;

    return model.count({
      where: {
        board_id: boardId,
      },
    });
  }

  findThread(threadId) {
    const {
      boardId, model, postModel, attachmentModel,
    } = this;

    return model.findOne({
      where: {
        board_id: boardId,
        id: threadId,
      },
      order: [
        ['updated_at', 'desc'],
        [{ model: postModel, as: 'posts' }, 'created_at', 'desc'],
        [
          { model: postModel, as: 'posts' },
          { model: attachmentModel, as: 'attachments' },
          'id',
          'asc',
        ],
      ],
      include: [
        {
          as: 'posts',
          model: postModel,
          include: [
            {
              as: 'attachments',
              model: attachmentModel,
            },
          ],
        },
      ],
    });
  }

  async createThread(fields, files, threadsLimit) {
    const {
      boardId, model, postModel, attachmentModel,
    } = this;

    const threads = await model.findAll({
      where: {
        board_id: boardId,
      },
      order: [['updated_at', 'desc']],
    });

    return db.transaction(async (t) => {
      const thread = await model.create({ board_id: boardId }, { transaction: t });

      const post = await postModel.create(
        { ...fields, thread_id: thread.id },
        { transaction: t },
      );

      // TODO: think how to separate work with db and files moving
      const attachmentsFields = await mediaFiles.moveFiles(
        files,
        boardId,
        thread.id,
      );

      const attachments = await Promise.all(
        attachmentsFields.map(attachment => attachmentModel.create(
          {
            ...attachment,
            post_id: post.id,
          },
          { transaction: t },
        )),
      );

      if (threads.length > threadsLimit - 1) {
        const threadsForDelete = threads.slice(threadsLimit - 1);

        await Promise.all(
          threadsForDelete.map(threadForDelete => Promise.all([
            threadForDelete.destroy({ transaction: t }),
            mediaFiles.removeThreadFiles(boardId, threadForDelete.id),
          ])),
        );
      }

      return [thread.toJSON(), post.toJSON(), attachments];
    });
  }

  updateThread(fields, files, thread) {
    const { boardId, postModel, attachmentModel } = this;

    return db.transaction(async (t) => {
      const post = await postModel.create(
        { ...fields, thread_id: thread.id },
        { transaction: t },
      );

      // TODO: think how to separate work with db and files moving
      const attachmentsFields = await mediaFiles.moveFiles(
        files,
        boardId,
        thread.id,
      );

      await Promise.all(
        attachmentsFields.map(attachment => attachmentModel.create(
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
  }
}

module.exports = Repository;
