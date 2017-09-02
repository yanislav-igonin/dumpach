import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

import './Post.scss';

const Post = ({ post, index }) => (
  <div className="post-container">
    <Paper className="post">
      <p className="post__title">{post.title}</p>
      <p
        className="post__time"
        style={post.title !== '' ? { marginLeft: 5 } : null}
      >
        {new Date(post.created_at).toLocaleTimeString()}
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
