import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import { getThread } from '../store/actions/thread';

import ThreadForm from '../components/ThreadForm';
import Post from '../components/Post';

const styles = (theme) => ({
  paginationContainer: {
    marginBottom: 20,
    textAlign: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class Thread extends Component {
  state = {
    isFormOpened: false,
  };

  componentDidMount = () => {
    const { boardId, threadId } = this.props.match.params;
    this.props.getThreads(boardId, threadId);
  };

  componentDidUpdate = (prevProps) => {
    const { boardId, threadId } = this.props.match.params;
    const { boardId: prevBoardId, threadId: prevThreadId } = prevProps.match.params;

    if (boardId !== prevBoardId || threadId !== prevThreadId) {
      this.props.getThread(boardId, threadId);
    }
  };

  handleOpenThreadFormClick = () => {
    const { isFormOpened } = this.state;
    this.setState({ isFormOpened: !isFormOpened });
  };

  render() {
    const { isFormOpened } = this.state;
    const { thread, classes, history } = this.props;
    const { boardId, threadId } = this.props.match.params;

    return (
      <div>
        {isFormOpened ? (
          <ThreadForm
            newThread={false}
            boardId={boardId}
            threadId={threadId}
            history={history}
          />
        ) : null}
        {thread.isFetching
          ? null
          : thread.data.posts.map((post, indexInThread) => (
            <Post
              key={post.id}
              post={post}
              indexInThread={indexInThread}
              thread={thread.data}
            />
          ))}
        <Tooltip title="Open form" placement="left">
          <Button
            variant="fab"
            className={classes.fab}
            color="primary"
            onClick={this.handleOpenThreadFormClick}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ thread }) => ({
  thread,
});

const mapDispatchToProps = (dispatch) => ({
  getThreads: (boardId, threadId) => {
    dispatch(getThread(boardId, threadId));
  },
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Thread),
);
