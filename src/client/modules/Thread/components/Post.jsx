import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

// import './Post.scss';

const Post = ({ post, index }) => (
  <Paper className="post-preview">
    <p className="post-preview__time">{post.createdAt}</p>
    {post.text.split('\n').map(row => (
      <p className="post-preview__text" key={row}>
        {row}
      </p>
    ))}
  </Paper>
);

export default Post;
