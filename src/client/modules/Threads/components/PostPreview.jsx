import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

import './PostPreview.scss';

const PostPreview = ({ post, index, threadId, allPosts }) => (
  <div className="post-preview-container">
    <Paper className="post-preview">
      <p className="post-preview__title">{post.title}</p>
      <p
        className="post-preview__time"
        style={post.title !== '' ? { marginLeft: 5 } : null}
      >
        {new Date(post.created_at).toLocaleTimeString()}
      </p>
      {index === 0 ? (
        <Link to={`${window.location.pathname}/${threadId}`}>Open</Link>
      ) : null}
      <br />
      {post.text.split('\n').map(row => (
        <p className="post-preview__text" key={row}>
          {row}
        </p>
      ))}

      {index === 0 ? (
        <p className="post-preview__all-posts">All posts: {allPosts}</p>
      ) : null}
    </Paper>
  </div>
);

export default PostPreview;
