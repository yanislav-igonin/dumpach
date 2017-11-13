import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Thread from './Thread';
import Threads from './Threads';
import { getThreads } from '../../../../Threads/duck';

class Boards extends Component {
  state = { boardId: 'b' };

  componentDidMount = () => {
    const { getThreads } = this.props;
    const { boardId } = this.state;
    getThreads(boardId);
  };

  handleItemClick = (e, { name }) => {
    const { history, match, getThreads } = this.props;
    this.setState({ boardId: name });
    history.replace(`${match.url}/${name}`);
    getThreads(name);
  };

  render() {
    const { match, threads } = this.props;
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
                  threads={threads}
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

const mapStateToProps = (state) => ({
  threads: state.threads,
});

export default connect(mapStateToProps, { getThreads })(Boards);
