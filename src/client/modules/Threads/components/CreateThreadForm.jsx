import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import './CreateThreadForm.scss';

const CreateThreadForm = ({ handleSubmit }) => (
  <div className="create-thread-form">
    <Paper zDepth={1} className="create-thread-form__container">
      <h3 className="header">Create thread</h3>
      <TextField label="OP post" fullWidth multiline className="post-text" />
      <Button raised color="primary">
        Create thread
      </Button>
    </Paper>
  </div>
);

export default CreateThreadForm;
