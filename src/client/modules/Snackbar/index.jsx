import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';

const SnackbarComponent = ({ opened, message }) => (
  <Snackbar
    open={opened}
    transition={Fade}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{message}</span>}
  />
  );

const mapStateToProps = state => ({
  opened: state.get('snackbar').get('opened'),
  message: state.get('snackbar').get('message'),
});

export default connect(mapStateToProps)(SnackbarComponent);
