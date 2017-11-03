const db = require('../../db/connection/');
const formParser = require('../helpers/formParser');
const boards = require('../../db/repositories/boards');

module.exports = {
  async getThreads(req, res) {
    try {
      const { boardId } = req.params;
      res.send(await boards.getThreads(db, boardId));
    } catch (e) {
      res.status(404).send(e.message);
    }
  },

  async getThread(req, res) {
    try {
      const { boardId, threadId } = req.params;
      res.send(await boards.getThread(db, boardId, threadId));
    } catch (e) {
      res.status(404).send(e.message);
    }
  },

  async createThread(req, res) {
    try {
      const { boardId } = req.params;
      const post = await formParser.parseFormData(req);

      res
        .status(201)
        .send((await boards.createThread(db, boardId, post)).toString());
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  async answerInThread(req, res) {
    try {
      const { boardId, threadId } = req.params;
      const post = await formParser.parseFormData(req);
      res.status(201).send(await boards.answerInThread(db, boardId, threadId, post));
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
};
