module.exports = {
  getThreads(req, res) {
    res.send(THREADS);
  },

  getThread(req, res) {
    res.send(THREADS[req.params.threadId]);
  },

  createThread(req, res) {
    const thread = {
      id: THREADS_ID++,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      posts: [
        {
          id: POSTS_ID++,
          title: req.body.title,
          text: req.body.text,
          sage: false,
          createdAt: Date.now(),
        },
      ],
    };

    THREADS.push(thread);

    res.send({ threadId: thread.id });
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
