import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

import './PostPreview.scss';

const PostPreview = ({ post, index, boardId, threadId, allPosts }) => (
  <div className="post-preview-container">
    <Paper className="post-preview">
      <p className="post-preview__title">{post.title}</p>
      <p
        className="post-preview__time"
        style={post.title !== '' || post.title === null ? { marginLeft: 5 } : null}
      >
        {new Date(post.created_at).toLocaleTimeString()}
      </p>
      <p
        className="post-preview__id"
        style={index === 0 ? { marginRight: 5 } : null}
      >
        №{post.id}
      </p>
      {index === 0 ? (
        <Link to={`${window.location.pathname}/${threadId}`}>Open</Link>
      ) : null}
      <br />

      {post.files.length !== 0 ? (
        <div className="post-preview__files">
          {post.files.map(file => (
            <div className="file-preview" key={file.post + file.name}>
              <Link to={`/uploads/${boardId}/${file.name}`} target="__blank">
                <img
                  className="file-preview__file"
                  src={`/uploads/${boardId}/thumbs/${file.name}`}
                  alt={file.name}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : null}

      {post.text !== null && post.text !== '' ? (
        post.text.split('\n').map(row => (
          <p className="post-preview__text" key={row}>
            {row}
          </p>
        ))
      ) : null}

      {index === 0 ? (
        <p className="post-preview__all-posts">All posts: {allPosts}</p>
      ) : null}
    </Paper>
  </div>
);

export default PostPreview;
