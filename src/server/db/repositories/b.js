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

const getThread = async (db, threadId) => {
  const thread = await db.one('SELECT * FROM b_threads WHERE id = $1', [threadId]);
  thread.posts = await db.any('SELECT * FROM b_posts WHERE thread_id = $1', [threadId]);
  return thread;
}

const createThread = async (db, post) => {
  const thread = await db.one(
    'INSERT INTO b_threads DEFAULT VALUES RETURNING id'
  );
  await db.query(
    'INSERT INTO b_posts(thread_id, title, text) VALUES($1, $2, $3)',
    [thread.id, post.title, post.text]
  );
  return thread.id;
};

const answerInThread = async (db, threadId, post) => {
  // const thread = await db.one(
  //   'INSERT INTO b_threads DEFAULT VALUES RETURNING id'
  // );
  // await db.query(
  //   'INSERT INTO b_posts(thread_id, title, text) VALUES($1, $2, $3)',
  //   [thread.id, post.title, post.text]
  // );
  return await getThread();
};


module.exports = {
  getThreads,
  getThread,
  createThread,
  answerInThread,
};
