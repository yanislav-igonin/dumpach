import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Thread from './Thread';
import Threads from './Threads';

import { deleteThread } from '../../../../Threads/duck';

class Boards extends Component {
  state = { boardId: 'b' };

  handleItemClick = (e, { name }) => {
    const { history, match } = this.props;
    this.setState({ boardId: name }, () => {
      history.replace(`${match.url}/${name}`);
      // getThreads(name);
    });
  };

  handleThreadDelete = (boardId, threadId) => {
    this.props.deleteThread(boardId, threadId);
  }

  render() {
    const { match } = this.props;
    const { boardId } = this.state;

    return (
      <div className="boards">
        <div className="boards__content">
          <Menu>
            <Menu.Item
              name="b"
              active={boardId === 'b'}
              onClick={this.handleItemClick}
            >
              /b
            </Menu.Item>

            <Menu.Item
              name="dev"
              active={boardId === 'dev'}
              onClick={this.handleItemClick}
            >
              /dev
            </Menu.Item>
          </Menu>

          <Switch>
            <Route
              path={`${match.url}/:boardId/:threadId`}
              component={({ match }) => <Thread match={match} boardId={boardId} />}
            />
            <Route
              path={`${match.url}/:boardId`}
              component={({ match, history }) => (
                <Threads
                  match={match}
                  history={history}
                  handleThreadDelete={this.handleThreadDelete}
                  boardId={boardId}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteThread })(Boards);
