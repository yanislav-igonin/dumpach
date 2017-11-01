import React from 'react';
import { Link } from 'react-router-dom';

import './PostPreview.scss';

const PostPreview = ({ post, index, boardId, threadId, allPosts }) => (
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
        <p className="post-info__id" style={index === 0 ? { marginRight: 5 } : null}>
          №{post.id}
        </p>
        {index === 0 ? (
          <Link to={`${window.location.pathname}/${threadId}`}>Open</Link>
        ) : null}
        <br />
      </div>

      {post.files.length !== 0 ? (
        <div
          className="files"
          style={post.files.length < 3 ? { display: 'inline-block' } : null}
        >
          {post.files.map((file) => (
            <div className="files__preview" key={file.post + file.name}>
              <File file={file} boardId={boardId} />
            </div>
          ))}
        </div>
      ) : null}

      <div
        style={
          post.files.length < 3
            ? { display: 'inline-block', verticalAlign: 'top' }
            : null
        }
      >
        {post.text !== null && post.text !== ''
          ? post.text.split('\n').map((row) => (
              <p className="text" key={row}>
                {row}
              </p>
            ))
          : null}
      </div>

      {index === 0 ? (
        <p className="all-posts-count">All posts: {allPosts}</p>
      ) : null}
    </div>
  </div>
);

export default PostPreview;

class File extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      enlarged: false,
    };
  }

  toggleEnlarge = () => {
    this.setState({ enlarged: !this.state.enlarged });
  };

  render() {
    const { file, boardId } = this.props;
    const { enlarged } = this.state;

    return (
      <img
        onClick={this.toggleEnlarge}
        className={
          enlarged === false ? 'file--preview' : 'file'
        }
        src={
          enlarged === false
            ? `/uploads/${boardId}/thumbs/${file.name}`
            : `/uploads/${boardId}/${file.name}`
        }
        alt={file.name}
      />
    );
  }
}
