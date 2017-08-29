import React from 'react';

import Post from './Post';

const ThreadContainer = ({ thread }) => (
  <div className="thread-conatiner">
    {thread.get('posts') !== undefined ? (
      thread
        .get('posts')
        .map((post, index) => <Post post={post} index={index} key={post.id} />)
    ) : null}
  </div>
);

export default ThreadContainer;
