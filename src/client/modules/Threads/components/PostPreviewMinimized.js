import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './PostPreview.scss';

const PostPreviewMinimized = ({
  post,
  index,
  boardId,
  threadId,
  allPosts,
  threadMinimized,
  minimizeThread,
}) => (
  <div className="post-preview">
    <div className="post-preview__content">
      <div className="post-info">
        <p className="post-info__title">{post.title}</p>
        <p
          className="post-info__time"
          style={post.title !== '' || post.title === null ? { marginLeft: 5 } : null}
        >
          {new Date(post.created_at).toLocaleDateString()}{' '}
          {new Date(post.created_at).toLocaleTimeString()}
        </p>
        <p className="post-info__id" style={{ marginRight: 5 }}>
          №{post.id}
        </p>

        <Icon
          className="post-info__minimize-icon"
          name="minus square"
          size="large"
          onClick={minimizeThread}
        />

        <Link to={`${window.location.pathname}/${threadId}`}>Open</Link>
        <br />
      </div>

      {index === 0 ? <p className="all-posts-count">All posts: {allPosts}</p> : null}
    </div>
  </div>
);

export default PostPreviewMinimized;
