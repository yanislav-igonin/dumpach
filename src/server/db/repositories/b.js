const Promise = require('bluebird');

const getThreads = async (db) => {
  const threadsWithPosts = [];
  const threads = await db.any('SELECT * FROM b_threads');

  await Promise.map(threads, async (thread) => {
    thread.posts = await db.any(
      `SELECT * FROM b_posts WHERE b_posts.thread_id=${thread.id}`
    );
    threadsWithPosts.push(thread);
  });

  return threads;
};

const createThread = async (db, post) => {
  const thread = await db.one(
    'INSERT INTO b_threads DEFAULT VALUES RETURNING id'
  );
  // await db.none(
  //   "INSERT INTO b_posts ('threadId', title, text) VALUES (1,'', Some dickblowing information')"
  // );
  //   debugger;
  await db.query(
    'INSERT INTO b_posts(thread_id, title, text) VALUES ($1, $2, $3)',
    [thread.id, post.title, post.text]
  );
  return thread.id;
};

module.exports = {
  getThreads,
  createThread,
};
