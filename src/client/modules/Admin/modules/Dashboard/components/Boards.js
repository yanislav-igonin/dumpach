import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { getThreads } from '../../../../Threads/duck';

class Dashboard extends Component {
  state = { boardId: 'b' };

  componentDidMount = () => {
    const { getThreads } = this.props;
    const { boardId } = this.state;
    getThreads(boardId);
  }
  
  handleItemClick = (e, { name }) => {
    const { history, match, getThreads } = this.props;
    this.setState({ boardId: name });
    history.replace(`${match.url}/${name}`);
    getThreads(name);
  };

  render() {
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

          <Switch />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getThreads })(Dashboard);
