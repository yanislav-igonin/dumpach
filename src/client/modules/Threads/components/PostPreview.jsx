import React from 'react';
import Paper from 'material-ui/Paper';

import './PostPreview.scss';

const PostPreview = ({ post }) =>
  <Paper className="post-preview">
    {post.text}
  </Paper>;

export default PostPreview;
