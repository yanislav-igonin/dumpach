const router = require('express').Router();

router.post('/:boardId', (req, res) => {
  THREADS.push({
    id: THREADS_ID++,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    posts: [{
      id: POSTS_ID++,
      text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      sage: false,
      createdAt: Date.now(),
    }],
  });

  res.send({ threadId: THREADS_ID });
});

router.get('/:boardId', (req, res) => {
  res.send(THREADS);
});

router.get('/:boardId/:threadId', (req, res) => {
  res.send(THREADS[req.params.threadId]);
});

module.exports = router;

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
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
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
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
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
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: POSTS_ID++,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
    ],
  },
];
