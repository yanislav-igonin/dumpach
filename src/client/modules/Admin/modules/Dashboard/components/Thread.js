import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Checkbox } from 'semantic-ui-react';
import { getThread } from '../../../../Thread/duck';

import './Threads.scss';

class Thread extends Component {
  componentDidMount = () => {
    // const { getThread, boardId, boardId } = this.props;
    // getThread(boardId, )
  }
  

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
                  <Table.Cell>{thread.id}</Table.Cell>
                  <Table.Cell>
                    <div
                      dangerouslySetInnerHTML={{ __html: thread.posts[0].text }}
                    />
                  </Table.Cell>
                  <Table.Cell>{thread.all_posts}</Table.Cell>
                  <Table.Cell>
                    {new Date(thread.created_at).toLocaleDateString()}{' '}
                    {new Date(thread.created_at).toLocaleTimeString()}
                  </Table.Cell>
                  <Table.Cell>
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

const mapStateToProps = (state) => ({
  thread: state.thread,
});

export default connect(mapStateToProps, { getThread })(Thread);
