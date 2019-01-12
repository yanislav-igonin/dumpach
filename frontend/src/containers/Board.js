import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import { getThreads } from '../store/actions/threads';
import ThreadPreview from '../components/ThreadPreview';
import ThreadForm from '../components/ThreadForm';

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

class Board extends Component {
  state = {
    isFormOpened: true,
  };

  componentDidMount = () => {
    const { boardId, pageId } = this.props.match.params;
    const {
      settings: {
        pagination: { threadsPerPage },
      },
    } = this.props;

    this.props.getThreads(boardId, threadsPerPage, (pageId - 1) * threadsPerPage || 0);
  };

  componentDidUpdate = (prevProps) => {
    const { boardId, pageId } = this.props.match.params;
    const { boardId: prevBoardId } = prevProps.match.params;
    const {
      settings: {
        pagination: { threadsPerPage },
      },
    } = this.props;

    if (boardId !== prevBoardId) {
      // TODO: make pagination avaliable via links
      this.props.getThreads(boardId, threadsPerPage, (pageId - 1) * threadsPerPage || 0);
    }
  };

  handlePaginationClick = (offset) => {
    const { boardId } = this.props.match.params;
    const {
      settings: {
        pagination: { threadsPerPage },
      },
    } = this.props;
    
    this.props.history.push(`/${boardId}/${(offset / threadsPerPage) + 1}`);

    console.log('​Board -> handlePaginationClick -> offset', offset);
    console.log(
      '​Board -> handlePaginationClick -> offset / threadsPerPage',
      offset / threadsPerPage
    );

    // this.setState({ page: offset / settings.pagination.threadsPerPage });

    this.props.getThreads(boardId, threadsPerPage, offset);
  };

  handleOpenThreadFormClick = () => {
    const { isFormOpened } = this.state;
    this.setState({ isFormOpened: !isFormOpened });
  };

  render() {
    const { isFormOpened } = this.state;
    const {
      settings: {
        pagination: { threadsPerPage },
      },
      threads,
      classes,
      history,
    } = this.props;
    const { boardId, pageId } = this.props.match.params;

    // TODO: maybe make form invisible, not unmounted, because it removes all data in form
    return (
      <div>
        {isFormOpened ? (
          <ThreadForm newThread={true} boardId={boardId} history={history} />
        ) : null}
        {!threads.isFetching ? (
          <div className={classes.paginationContainer}>
            <Pagination
              limit={threadsPerPage}
              offset={(pageId - 1 || 0) * threadsPerPage}
              total={threads.count}
              onClick={(e, offset) => this.handlePaginationClick(offset)}
            />
          </div>
        ) : null}
        {threads.data.map((thread) => (
          <ThreadPreview thread={thread} key={thread.id} />
        ))}
        {!threads.isFetching ? (
          <div className={classes.paginationContainer}>
            <Pagination
              limit={threadsPerPage}
              offset={(pageId - 1 || 0) * threadsPerPage}
              total={threads.count}
              onClick={(e, offset) => this.handlePaginationClick(offset)}
            />
          </div>
        ) : null}
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

const mapStateToProps = ({ settings, threads }) => ({
  settings,
  threads,
});

const mapDispatchToProps = (dispatch) => ({
  getThreads: (boardId, threadsPerPage, offset) => {
    dispatch(getThreads(boardId, threadsPerPage, offset));
  },
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Board)
);
