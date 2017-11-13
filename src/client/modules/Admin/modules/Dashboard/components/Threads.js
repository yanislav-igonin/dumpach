import React, { Component } from 'react';
import { Table, Checkbox } from 'semantic-ui-react';

import './Threads.scss';

export default class Threads extends Component {
  onThreadClick = (id) => {
    const { history, match } = this.props;
    debugger
    history.replace(`${match.url}/${id}`);
  };

  render() {
    const { threads } = this.props;
    return (
      <div className="threads-list">
        <div className="threads-list__content">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>OP post</Table.HeaderCell>
                <Table.HeaderCell>Posts</Table.HeaderCell>
                <Table.HeaderCell>Created at</Table.HeaderCell>
                <Table.HeaderCell>Updated at</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {threads.map((thread) => (
                <Table.Row key={thread.id}>
                  <Table.Cell>
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell onClick={() => this.onThreadClick(thread.id)}>
                    {thread.id}
                  </Table.Cell>
                  <Table.Cell onClick={() => this.onThreadClick(thread.id)}>
                    <div
                      dangerouslySetInnerHTML={{ __html: thread.posts[0].text }}
                    />
                  </Table.Cell>
                  <Table.Cell onClick={() => this.onThreadClick(thread.id)}>
                    {thread.all_posts}
                  </Table.Cell>
                  <Table.Cell onClick={() => this.onThreadClick(thread.id)}>
                    {new Date(thread.created_at).toLocaleDateString()}{' '}
                    {new Date(thread.created_at).toLocaleTimeString()}
                  </Table.Cell>
                  <Table.Cell onClick={() => this.onThreadClick(thread.id)}>
                    {new Date(thread.updated_at).toLocaleDateString()}{' '}
                    {new Date(thread.updated_at).toLocaleTimeString()}
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
