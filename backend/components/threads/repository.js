const {
  Board, Thread, Post, Attachment,
} = require('../../db').models;

class Repository {
  constructor(boardId) {
    this.boardId = boardId;
    this.boardModel = Board;
    this.model = Thread[boardId];
    this.postModel = Post[boardId];
    this.attachmentModel = Attachment[boardId];
  }

  findBoard(boardId) {
    return this.boardModel.findOne({
      where: {
        id: boardId,
      },
    });
  }

  findThreads(limit, offset) {
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
}

module.exports = Repository;
