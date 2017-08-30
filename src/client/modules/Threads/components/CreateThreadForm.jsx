import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';

import './CreateThreadForm.scss';

const renderTextField = ({ input }) => (
  <TextField hintText={'Cocl'} {...input} />
);

const validate = (values) => {
  const errors = {};
  const requiredFields = ['text'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateThreadForm = ({ handleSubmit, pristine, reset, submitting }) => (
  <div className="create-thread-form">
    <form onSubmit={handleSubmit}>
      <Field name="text" component={renderTextField} label="First Name" />
    </form>
  </div>
);

export default reduxForm({
  form: 'CreateThreadForm', // a unique identifier for this form
  validate,
})(CreateThreadForm);
