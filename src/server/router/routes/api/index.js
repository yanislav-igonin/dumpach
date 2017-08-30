const router = require('express').Router();
const boardsHandlers = require('../../handlers/boards');

router.get('/:boardId', boardsHandlers.getThreads);

router.post('/:boardId', boardsHandlers.createThread);

router.get('/:boardId/:threadId', boardsHandlers.getThread);

module.exports = router;
