import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Pagination from 'material-ui-flat-pagination';

import { getThreads } from '../store/actions/threads';
import ThreadPreview from '../components/ThreadPreview';

const BoardContainer = styled.div``;
const PaginationContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

class Board extends Component {
  state = {
    page: 0
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
      this.props.getThreads(boardId, settings.threads.limitPerPage);
    }
  };

  handlePaginationClick = offset => {
    const { boardId } = this.props.match.params;
    const { settings } = this.props;

    this.setState({ page: offset / settings.threads.limitPerPage });

    this.props.getThreads(boardId, settings.threads.limitPerPage, offset);
  };

  render() {
    const { page } = this.state;
    const { settings, threads } = this.props;

    return (
      <BoardContainer>
        <PaginationContainer>
          <Pagination
            limit={settings.threads.limitPerPage}
            offset={page * settings.threads.limitPerPage}
            total={threads.count}
            onClick={(e, offset) => this.handlePaginationClick(offset)}
          />
        </PaginationContainer>

        {threads.data.map(thread => (
          <ThreadPreview thread={thread} key={thread.id} />
        ))}

        {!threads.isFetching ? (
          <PaginationContainer>
            <Pagination
              limit={settings.threads.limitPerPage}
              offset={page * settings.threads.limitPerPage}
              total={threads.count}
              onClick={(e, offset) => this.handlePaginationClick(offset)}
            />
          </PaginationContainer>
        ) : null}
      </BoardContainer>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
