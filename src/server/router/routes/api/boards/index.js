const router = require('express').Router();
const allowedBoardsMiddleware = require('./allowedBoardsMiddleware');
const boardsHandlers = require('../../../handlers/boards');

router.get('/:boardId', allowedBoardsMiddleware, boardsHandlers.getThreads);

router.post('/:boardId', allowedBoardsMiddleware, boardsHandlers.createThread);

router.get('/:boardId/:threadId', allowedBoardsMiddleware, boardsHandlers.getThread);

router.post(
  '/:boardId/:threadId',
  allowedBoardsMiddleware,
  boardsHandlers.answerInThread
);

module.exports = router;
