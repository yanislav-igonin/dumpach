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

const styles = theme => ({
  paginationContainer: {
    marginBottom: 20,
    textAlign: 'center'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class Board extends Component {
  state = {
    page: 0,
    isFormOpened: true
  };

  componentDidMount = () => {
    const { boardId } = this.props.match.params;
    const { settings } = this.props;

    this.props.getThreads(boardId, settings.threads.limitPerPage);
  };

  componentDidUpdate = prevProps => {
    const { boardId } = this.props.match.params;
    const { boardId: prevBoardId } = prevProps.match.params;
    const { settings } = this.props;

    if (boardId !== prevBoardId) {
      // TODO: make pagination avaliable via links
      this.setState({ page: 0 });
      this.props.getThreads(boardId, settings.threads.limitPerPage);
    }
  };

  handlePaginationClick = offset => {
    const { boardId } = this.props.match.params;
    const { settings } = this.props;

    this.setState({ page: offset / settings.threads.limitPerPage });

    this.props.getThreads(boardId, settings.threads.limitPerPage, offset);
  };

  handleOpenThreadFormClick = () => {
    const { isFormOpened } = this.state;
    this.setState({ isFormOpened: !isFormOpened });
  };

  render() {
    const { page, isFormOpened } = this.state;
    const { settings, threads, classes } = this.props;

    // TODO: maybe make form invisible, not unmounted, because it removes all data in form
    return (
      <div>
        {isFormOpened ? <ThreadForm /> : null}
        <div className={classes.paginationContainer}>
          <Pagination
            limit={settings.threads.limitPerPage}
            offset={page * settings.threads.limitPerPage}
            total={threads.count}
            onClick={(e, offset) => this.handlePaginationClick(offset)}
          />
        </div>
        {threads.data.map(thread => (
          <ThreadPreview thread={thread} key={thread.id} />
        ))}
        {!threads.isFetching ? (
          <div className={classes.paginationContainer}>
            <Pagination
              limit={settings.threads.limitPerPage}
              offset={page * settings.threads.limitPerPage}
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
  threads
});

const mapDispatchToProps = dispatch => ({
  getThreads: (boardId, limitPerPage, offset) => {
    dispatch(getThreads(boardId, limitPerPage, offset));
  }
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Board)
);
