import React from 'react';
import { connect } from 'react-redux';

import { addAsync } from './actions';

import './index.scss';

class Main extends React.PureComponent {
  renderData() {
    return this.props.data.map(data =>
      <p key={data}>
        {data}
      </p>
    );
  }

  render() {
    return (
      <div className="main">
        <button onClick={() => this.props.dispatch(addAsync())}>
          <h1>Add async</h1>
        </button>
        {this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ data: state.get('data') });

export default connect(mapStateToProps)(Main);
