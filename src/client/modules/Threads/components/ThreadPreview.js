import React from 'react';
import PostPreview from './PostPreview';
import PostPreviewMinimized from './PostPreviewMinimized';

export default class ThreadPreview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      threadMinimized: false,
    };
  }

  componentDidMount() {
    const { boardId, thread } = this.props;
    const threadMinimized = JSON.parse(localStorage.getItem(
      `threadMinimized-${boardId}-${thread.id}`
    ));
    this.setState({ threadMinimized: threadMinimized });
  }

  componentWillReceiveProps(nextProps) {
    const { boardId, thread } = nextProps;
    const threadMinimized = JSON.parse(localStorage.getItem(
      `threadMinimized-${boardId}-${thread.id}`
    ));
    this.setState({ threadMinimized: threadMinimized });
  }

  minimizeThread = () => {
    const { threadMinimized } = this.state;
    const { thread, boardId } = this.props;

    localStorage.setItem(
      `threadMinimized-${boardId}-${thread.id}`,
      !threadMinimized
    );

    this.setState({ threadMinimized: !threadMinimized });
  };

  render() {
    const { thread, boardId } = this.props;
    const { threadMinimized } = this.state;

    return (
      <div
        className="thread-preview"
        style={{ marginBottom: 10 }}
      >
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
