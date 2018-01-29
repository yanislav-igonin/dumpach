const Promise = require('bluebird');
const fs = require('fs');
const config = require('../../config/config');

const getThreads = async (db, boardId) => {
  try {
    const threadsWithPosts = [];
    const threads = await db.any(
      `SELECT * FROM ${boardId}_threads 
      ORDER BY updated_at DESC`
    );

    await Promise.map(threads, async (thread) => {
      const posts = await db.any(
        `SELECT * FROM ${boardId}_posts 
        WHERE ${boardId}_posts.thread_id=$1 
        ORDER BY created_at ASC`,
        [thread.id]
      );

      await Promise.map(posts, async (post) => {
        post.files = await db.any(
          `SELECT * FROM ${boardId}_files 
          WHERE ${boardId}_files.post_id=$1`,
          [post.id]
        );
      });

      if (posts.length > 2) {
        thread.posts = [posts[0], posts[posts.length - 2], posts[posts.length - 1]];
      } else if (posts.length > 1) {
        thread.posts = [posts[0], posts[posts.length - 1]];
      } else {
        thread.posts = [];
        thread.posts[0] = posts[0];
      }

      thread.all_posts = posts.length;

      threadsWithPosts.push(thread);
    });

    return threads;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getThread = async (db, boardId, threadId) => {
  try {
    const thread = await db.one(`SELECT * FROM ${boardId}_threads WHERE id = $1`, [
      threadId,
    ]);
    thread.posts = await db.any(
      `SELECT * FROM ${boardId}_posts 
      WHERE thread_id = $1 
      ORDER BY created_at ASC`,
      [threadId]
    );

    await Promise.map(thread.posts, async (post) => {
      post.files = await db.any(
        `SELECT * FROM ${boardId}_files 
        WHERE ${boardId}_files.post_id=$1`,
        [post.id]
      );

      const repliesData = await db.any(
        `SELECT reply_id from ${boardId}_replies WHERE post_id=$1`,
        [post.id]
      );

      post.replies = repliesData.map((replyObject) => replyObject.reply_id);
    });
    return thread;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteThread = async (db, boardId, threadId) => {
  try {
    await db.one(`SELECT * FROM ${boardId}_threads WHERE id = $1`, [threadId]); //checking thread existance

    const files = await db.query(
      `SELECT name from ${boardId}_files WHERE ${boardId}_files.thread_id=$1`,
      [threadId]
    );

    files.forEach(async (file) => {
      fs.unlink(`${config.app.uploadDir}/b/${file.name}`, (err) =>
        console.log(`${file.name} deleted`)
      );
      fs.unlink(`${config.app.uploadDir}/b/thumbs/${file.name}`, (err) =>
        console.log(`${file.name} thumb deleted`)
      );
    });
    await db.query(`DELETE FROM ${boardId}_threads WHERE id=$1`, [threadId]);

    return 'Thread deleted';
  } catch (e) {
    throw new Error(e.message);
  }
};

const createThread = async (db, boardId, post) => {
  try {
    const thread = await db.one(
      `INSERT INTO ${boardId}_threads 
      DEFAULT VALUES 
      RETURNING id`
    );

    const threads = await db.any(
      `SELECT * FROM ${boardId}_threads 
      ORDER BY updated_at DESC`
    );

    if (threads.length > 49) {
      await deleteOldThreads(db, boardId);
    } else {
      console.log('threads: ', threads.length);
    }

    const postId = await db.one(
      `INSERT INTO ${boardId}_posts(thread_id, title, text) 
      VALUES($1, $2, $3) RETURNING id`,
      [thread.id, post.title, post.text]
    );

    await post.files.forEach(async (file) => {
      await db.query(
        `INSERT INTO ${boardId}_files(thread_id, post_id, name) 
        VALUES($1, $2, $3)`,
        [thread.id, postId.id, file]
      );
    });

    return thread.id;
  } catch (e) {
    throw new Error(e.message);
  }
};

const answerInThread = async (db, boardId, threadId, post) => {
  try {
    await threadExists(db, boardId, threadId);

    const posts = await db.any(
      `SELECT * FROM ${boardId}_posts 
      WHERE thread_id = $1 
      ORDER BY created_at ASC`,
      [threadId]
    );

    if (post.sage === 'false' && posts.length < 500) {
      await db.query(
        `UPDATE ${boardId}_threads 
        SET updated_at=DEFAULT 
        WHERE id=$1`,
        [threadId]
      );
    }

    const createdPost = await db.one(
      `INSERT INTO ${boardId}_posts(thread_id, title, text, sage)
      VALUES($1, $2, $3, $4)
      RETURNING *`,
      [threadId, post.title, post.text, post.sage]
    );

    await Promise.map(
      post.replies.split(',').map((replyId) => parseInt(replyId)),
      async (replyId) => {
        return await db.query(
          `INSERT INTO ${boardId}_replies(post_id, reply_id) VALUES($1, $2)`,
          [replyId, createdPost.id]
        );
      }
    );

    await post.files.forEach(async (file) => {
      await db.query(
        `INSERT INTO ${boardId}_files(thread_id, post_id, name) 
        VALUES($1, $2, $3)`,
        [threadId, createdPost.id, file]
      );
    });

    return await getThread(db, boardId, threadId);
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteOldThreads = async (db, boardId) => {
  try {
    const thread = await db.one(
      `SELECT id FROM ${boardId}_threads ORDER BY updated_at ASC LIMIT 1`
    );

    const files = await db.query(
      `SELECT name from ${boardId}_files WHERE ${boardId}_files.thread_id=$1`,
      [thread.id]
    );

    files.forEach(async (file) => {
      fs.unlink(`${config.app.uploadDir}/b/${file.name}`, (err) =>
        console.log(`${file.name} deleted`)
      );
      fs.unlink(`${config.app.uploadDir}/b/thumbs/${file.name}`, (err) =>
        console.log(`${file.name} thumb deleted`)
      );
    });
    await db.query(`DELETE FROM ${boardId}_threads WHERE id=$1`, [thread.id]);
  } catch (e) {
    throw new Error(e.message);
  }
};

const threadExists = async (db, boardId, threadID) => {
  try {
    await db.one(`SELECT id FROM ${boardId}_threads WHERE id=$1`, [threadID]);
    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getThreads,
  getThread,
  deleteThread,
  createThread,
  answerInThread,
};
