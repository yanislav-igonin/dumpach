import React from 'react';
import Paper from 'material-ui/Paper';

import PostPreview from './PostPreview';

const ThreadPreview = ({ thread }) =>
  <div className="thread-preview">
    {thread.posts.map(post => <PostPreview post={post} key={post.id} />)}
  </div>;

export default ThreadPreview;
