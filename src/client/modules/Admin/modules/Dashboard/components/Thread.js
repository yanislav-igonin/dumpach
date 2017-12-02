import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Checkbox } from 'semantic-ui-react';
import { getThread } from '../../../../Thread/duck';

import './Thread.scss';

class Thread extends Component {
  componentDidMount = () => {
    const { getThread, match } = this.props;
    getThread(match.params.boardId, match.params.threadId);
  };

  handleDeleteClick(id) {
    console.log(id);
  }

  render() {
    const { thread } = this.props;

    return (
      <div className="thread">
        <div className="thread__content">
          <Table celled textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Text</Table.HeaderCell>
                <Table.HeaderCell>Files</Table.HeaderCell>
                <Table.HeaderCell>Sage</Table.HeaderCell>
                <Table.HeaderCell>Created at</Table.HeaderCell>
                {/* <Table.HeaderCell /> */}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {thread.posts !== undefined
                ? thread.posts.map((post) => (
                    <Table.Row key={post.id}>
                      <Table.Cell>
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell>{post.id}</Table.Cell>
                      <Table.Cell>{post.title}</Table.Cell>
                      <Table.Cell>
                        <div dangerouslySetInnerHTML={{ __html: post.text }} />
                      </Table.Cell>
                      <Table.Cell>{post.files.length}</Table.Cell>
                      <Table.Cell>{JSON.stringify(post.sage)}</Table.Cell>
                      <Table.Cell>
                        {new Date(thread.created_at).toLocaleDateString()}{' '}
                        {new Date(thread.created_at).toLocaleTimeString()}
                      </Table.Cell>
                      {/* <Table.Cell>
                        <Icon
                          name="delete"
                          color="red"
                          onClick={() => this.handleDeleteClick(post.id)}
                          className="delete-icon"
                        />
                      </Table.Cell> */}
                    </Table.Row>
                  ))
                : null}
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
