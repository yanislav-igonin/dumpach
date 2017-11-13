import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Boards from './components/Boards';

import './index.scss';

class Dashboard extends Component {
  state = { activeTab: 'boards' };

  handleItemClick = (e, { name }) => {
    const { history, match } = this.props;
    this.setState({ activeTab: name });
    history.replace(`${match.url}/${name}`);
  };

  render() {
    const { activeTab } = this.state;
    const { match } = this.props;

    return (
      <div className="dashboard">
        <div className="dashboard__content">
          <Menu className="menu">
            <Menu.Item
              name="boards"
              active={activeTab === 'boards'}
              onClick={this.handleItemClick}
            >
              Boards
            </Menu.Item>

            <Menu.Item
              name="users"
              active={activeTab === 'users'}
              onClick={this.handleItemClick}
            >
              Users
            </Menu.Item>
          </Menu>

          <Switch>
            <Route path={`${match.url}/boards`} component={Boards} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
