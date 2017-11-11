import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

const SnackbarComponent = ({ opened, message }) => (
  <div className={opened === true ? 'snackbar' : 'snackbar--closed'}>
    <div className="snackbar__content">
      <p className="message">{message}</p>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  opened: state.snackbar.opened,
  message: state.snackbar.message,
});

export default connect(mapStateToProps)(SnackbarComponent);
