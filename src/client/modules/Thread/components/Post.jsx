import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

import './Post.scss';

const Post = ({ post, index }) => (
  <div className="post-container">
    <Paper className="post">
      <p className="post__time">
        {new Date(post.createdAt).toLocaleTimeString()}
      </p>
      {post.text.split('\n').map(row => (
        <p className="post__text" key={row}>
          {row}
        </p>
      ))}
    </Paper>
  </div>
);

export default Post;
