import React from 'react';

import PostPreview from './PostPreview';

const ThreadPreview = ({ thread }) => (
  <div className="thread-preview">
    {thread.posts.map((post, index) => (
      <PostPreview post={post} index={index} key={post.id} />
    ))}
  </div>
);

export default ThreadPreview;
