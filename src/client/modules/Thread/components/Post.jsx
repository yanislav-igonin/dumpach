import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

import './Post.scss';

const Post = ({ post, index, boardId }) => (
  <div className="post-container">
    <Paper className="post">
      <p className="post__title">{post.title}</p>
      <p
        className="post__time"
        style={post.title !== '' ? { marginLeft: 5 } : null}
      >
        {new Date(post.created_at).toLocaleTimeString()}
      </p>
      {post.sage === true ? <p className="post__sage">SAGE</p> : null}
      <p className="post__index">#{index + 1}</p>
      <p className="post__id">№{post.id}</p>

      {post.files.length !== 0 ? (
        <div className="post__files">
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

      {post.text !== null || post.text !== '' ? (
        post.text.split('\n').map(row => (
          <p className="post-__text" key={row}>
            {row}
          </p>
        ))
      ) : null}
    </Paper>
  </div>
);

export default Post;
