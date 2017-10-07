import React from 'react';

import Post from './Post';

const ThreadContainer = ({ thread, boardId }) => (
  <div className="thread-conatiner">
    {thread.get('posts') !== undefined ? (
      thread
        .get('posts')
        .map((post, index) => (
          <Post boardId={boardId} post={post} index={index} key={post.id} />
        ))
    ) : null}
  </div>
);

export default ThreadContainer;
