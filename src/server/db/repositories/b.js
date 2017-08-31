const Promise = require('bluebird');

const getThreads = async (db) => {
  // const threadsWithPosts = [];
  // db.any('SELECT * FROM b_threads').then((threads) => {
  //   threads.forEach((thread) => {
  //     Promise.all(
  //       db.any(`SELECT * FROM b_posts WHERE "threadId" = ${thread.id}`)
  //     ).then((posts) => {
  //       thread.posts = posts;
  //       console.log(thread)
  //       threadsWithPosts.push(thread);
  //     });
  //   });
  //   resolve(threadsWithPosts);
  // });
  const threadsWithPosts = [];
  const threads = await db.any('SELECT * FROM b_threads');
  threadsWithPosts = threads.map(thread => {
    const posts = await db.any(`SELECT * FROM b_posts WHERE b_posts."threadId"=${thread.id}`);
    console.log(posts)
  })
  console.log(threads);
};

const createThread = (db, req) =>
  db.one('INSERT INTO b_threads DEFAULT VALUES RETURNING id');
// db.any(
//   'INSERT INTO b_threads DEFAULT VALUES;' +
//     `INSERT INTO b_posts (title, text) VALUES (${req.body.title}, ${req.body
//       .text});`,
//   [true]
// );
// return 'dick';

module.exports = {
  getThreads,
  createThread,
};
