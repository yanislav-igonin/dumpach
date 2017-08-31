const db = require('../../db/connection/');
const b = require('../../db/repositories/b');

module.exports = {
  getThreads(req, res) {
    switch (req.params.boardId) {
      case 'b':
        b
          .getThreads(db)
          .then(threads => res.send(threads))
          .catch(e => console.log(e));
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

let THREADS_ID = 0;
let POSTS_ID = 0;
let THREADS = [
  {
    id: THREADS_ID++,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    posts: [
      {
        id: POSTS_ID++,
        title: 'quia et suscipit',
        text:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        title: 'quia et suscipit',
        text:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        title: 'quia et suscipit',
        text:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
    ],
  },
  {
    id: THREADS_ID++,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    posts: [
      {
        id: POSTS_ID++,
        title: 'quia et suscipit',
        text:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        title: 'quia et suscipit',
        text:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        title: 'quia et suscipit',
        text:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
    ],
  },
  {
    id: THREADS_ID++,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    posts: [
      {
        id: POSTS_ID++,
        title: 'quia et suscipit',
        text:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        title: 'quia et suscipit',
        text:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        title: 'quia et suscipit',
        text:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
    ],
  },
];
