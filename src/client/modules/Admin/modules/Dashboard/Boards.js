import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Boards extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      boardId: 'b',
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = (state) => ({
  threads: state.get('threads'),
});

export default connect(mapStateToProps)(Boards);
