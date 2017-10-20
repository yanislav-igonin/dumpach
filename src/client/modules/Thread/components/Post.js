import React from 'react';
import Paper from 'material-ui/Paper';

import './Post.scss';

const Post = ({ post, index, boardId }) => (
  <div className="post-container">
    <Paper className="post">
      <p className="post__title">{post.title}</p>
      <p
        className="post__time"
        style={post.title !== '' || post.title === null ? { marginLeft: 5 } : null}
      >
        {new Date(post.created_at).toLocaleDateString()}{' '}
        {new Date(post.created_at).toLocaleTimeString()}
      </p>
      {post.sage === true ? <p className="post__sage">SAGE</p> : null}
      <p className="post__index">#{index + 1}</p>
      <p className="post__id">№{post.id}</p>

      {post.files.length !== 0 ? (
        <div className="post__files">
          {post.files.map((file) => (
            <div className="file-preview" key={file.post + file.name}>
              <File file={file} boardId={boardId} />
            </div>
          ))}
        </div>
      ) : null}

      {post.text !== null && post.text !== ''
        ? post.text.split('\n').map((row) => (
            <p className="post__text" key={row}>
              {row}
            </p>
          ))
        : null}
    </Paper>
  </div>
);

export default Post;

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
          enlarged === false ? 'file-preview__file--preview' : 'file-preview__file'
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
