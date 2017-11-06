import React from 'react';
import PostPreview from './PostPreview';
import PostPreviewMinimized from './PostPreviewMinimized';

export default class ThreadPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      threadMinimized: false,
    };
  }

  minimizeThread = () => {
    const { threadMinimized } = this.state;
    this.setState({ threadMinimized: !threadMinimized });
  };

  render() {
    const { thread, boardId } = this.props;
    const { threadMinimized } = this.state;

    return (
      <div className="thread-preview" style={{ marginBottom: 10 }}>
        {threadMinimized === false ? (
          <div className="thread-preview__content">
            {thread.posts.map((post, index) => (
              <PostPreview
                post={post}
                boardId={boardId}
                threadId={thread.id}
                index={index}
                key={post.id}
                allPosts={thread.all_posts}
                threadMinimized={threadMinimized}
                minimizeThread={this.minimizeThread}
              />
            ))}
          </div>
        ) : (
          <div className="thread-preview--minimized">
            <PostPreviewMinimized
              post={thread.posts[0]}
              boardId={boardId}
              threadId={thread.id}
              allPosts={thread.all_posts}
              minimizeThread={this.minimizeThread}
            />
          </div>
        )}

        <hr />
      </div>
    );
  }
}
