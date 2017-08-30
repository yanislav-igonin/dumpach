import React from 'react';

import PostPreview from './PostPreview';

const ThreadPreview = ({ thread }) => (
  <div className="thread-preview">
    {thread.posts.map((post, index) => (
      <PostPreview
        post={post}
        threadId={thread.id}
        index={index}
        key={post.id}
      />
    ))}
  </div>
);

export default ThreadPreview;
