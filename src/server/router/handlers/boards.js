const db = require('../../db/connection/');
const b = require('../../db/repositories/b');

module.exports = {
  async getThreads(req, res) {
    switch (req.params.boardId) {
      case 'b':
        res.send(await b.getThreads(db));
        break;
      case 'dev':
        res.send('dickhead');
        break;
      default:
        res.sendStatus(404);
        break;
    }
  },

  async getThread(req, res) {
    switch (req.params.boardId) {
      case 'b':
        res.send(await b.getThread(db, req.params.threadId));
        break;
      case 'dev':
        res.send('dickhead');
        break;
      default:
        res.sendStatus(404);
        break;
    }
  },

  async createThread(req, res) {
    switch (req.params.boardId) {
      case 'b':
        res.send((await b.createThread(db, req.body)).toString());
        break;
      case 'dev':
        res.send('dickhead');
        break;
      default:
        res.sendStatus(404);
        break;
    }
  },

  async answerInThread(req, res) {
    switch (req.params.boardId) {
      case 'b':
        res.send(await b.answerInThread(db, req.params.threadId, req.body));
        break;
      case 'dev':
        res.send('dickhead');
        break;
      default:
        res.sendStatus(404);
        break;
    }
  },
};
