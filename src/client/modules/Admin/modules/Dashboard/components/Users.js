import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';

import { getUsers } from 'ducks/users';

import './Users.scss';

class Users extends Component {
  componentDidMount = () => {
    this.props.getUsers();
  };

  render() {
    const { users } = this.props;
    return (
      <div className="users">
        <div className="users__content">
          <Table celled textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Login</Table.HeaderCell>
                <Table.HeaderCell>Created at</Table.HeaderCell>
                <Table.HeaderCell>Last login at</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Active</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.login}</Table.Cell>
                  <Table.Cell>
                    {new Date(user.created_at).toLocaleDateString()}{' '}
                    {new Date(user.created_at).toLocaleTimeString()}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(user.last_login_at).toLocaleDateString()}{' '}
                    {new Date(user.last_login_at).toLocaleTimeString()}
                  </Table.Cell>
                  <Table.Cell>{user.role_title}</Table.Cell>

                  <Table.Cell>
                    {user.active === true ? (
                      <Icon
                        name="check"
                        color="green"
                        className="delete-icon"
                      />
                    ) : (
                      <Icon
                        name="remove"
                        color="red"
                        className="delete-icon"
                      />
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(Users);
