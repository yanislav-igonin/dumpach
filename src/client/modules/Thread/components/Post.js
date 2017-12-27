import React from 'react';
import { Icon } from 'semantic-ui-react';
// import AnswerIntThreadForm from './AnswerIntThreadForm';

import './Post.scss';

const Post = ({ post, index, boardId, replyId, handleReplyClick }) => (
  <div className="post">
    <div className="post__content">
      <div className="post-info">
        <p className="post-info__title">{post.title}</p>
        <p
          className="post-info__time"
          style={post.title !== '' || post.title === null ? { marginLeft: 5 } : null}
        >
          {new Date(post.created_at).toLocaleDateString()}{' '}
          {new Date(post.created_at).toLocaleTimeString()}
        </p>
        {post.sage === true ? <p className="post-info__sage">SAGE</p> : null}
        <p className="post-info__index">#{index + 1}</p>
        <p className="post-info__id" style={{ marginRight: 5 }}>
          №{post.id}
        </p>

        <Icon name="reply" onClick={() => handleReplyClick(post.id)} />
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
          ? post.text
              .split('\n')
              .map((row) => (
                <div
                  className="text"
                  key={row}
                  dangerouslySetInnerHTML={{ __html: row }}
                />
              ))
          : null}
      </div>
    </div>
    {/* {replyId === post.id ? <AnswerIntThreadForm /> : null} */}
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
        className={enlarged === false ? 'file--preview' : 'file'}
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
