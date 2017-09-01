import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

import './PostPreview.scss';

const PostPreview = ({ post, index, threadId }) => (
  <div className="post-preview-container">
    <Paper className="post-preview">
      <p className="post-preview__time">
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
    </Paper>
  </div>
);

export default PostPreview;
