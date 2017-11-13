import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Boards from './components/Boards';

import { logout } from '../../duck';

import './index.scss';

class Dashboard extends Component {
  state = { activeTab: 'boards' };

  handleItemClick = (e, { name }) => {
    const { history, match } = this.props;
    this.setState({ activeTab: name });
    history.replace(`${match.url}/${name}`);
  };

  handleLogout = () => {
    const { logout } = this.props;
    logout();
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

            <Menu.Menu position="right">
              <Menu.Item name="logout" onClick={this.handleLogout} />
            </Menu.Menu>
          </Menu>

          <Switch>
            <Route path={`${match.url}/boards`} component={Boards} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logout })(Dashboard);
