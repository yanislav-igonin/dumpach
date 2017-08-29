const router = require('express').Router();

router.get('/:boardId', (req, res) => {
  res.send(THREADS);
});

module.exports = router;

const THREADS = [
  {
    id: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    posts: [
      {
        id: 0,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: 1,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: 2,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
    ],
  },
  {
    id: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    posts: [
      {
        id: 3,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: 4,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: 5,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
    ],
  },
  {
    id: 2,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    posts: [
      {
        id: 6,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: 7,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
      {
        id: 8,
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        sage: false,
        createdAt: Date.now(),
      },
    ],
  },
];
