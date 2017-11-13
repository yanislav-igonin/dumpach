import React, { Component } from 'react';
import { Table, Checkbox } from 'semantic-ui-react';

import './ThreadsList.scss';

export default class ThreadsList extends Component {
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
                <Table.Row>
                  <Table.Cell collapsing>
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell>{thread.id}</Table.Cell>
                  <Table.Cell>
                    <div
                      dangerouslySetInnerHTML={{ __html: thread.posts[0].text }}
                    />
                  </Table.Cell>
                  <Table.Cell>{thread.all_posts}</Table.Cell>
                  <Table.Cell>{thread.created_at}</Table.Cell>
                  <Table.Cell>{thread.updated_at}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}
