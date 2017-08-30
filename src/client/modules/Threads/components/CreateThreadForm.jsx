import React from 'react';
import TextField from 'material-ui/TextField';

import './CreateThreadForm.scss';

const CreateThreadForm = ({ handleSubmit }) => (
  <div className="create-thread-form">
    <form onSubmit={handleSubmit}>
      <TextField hintText="Hint Text" />
    </form>
  </div>
);

export default CreateThreadForm;
