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

  getThread(req, res) {
    res.send(THREADS[req.params.threadId]);
  },

  createThread(req, res) {
    b
      .createThread(db, req.body)
      .then(thread => res.send(thread.id.toString()))
      .catch(e => console.log(e));
  },
};
