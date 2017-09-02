import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';

import './AnswerIntThreadForm.scss';

class CreateThreadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      sage: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCheckboxChange(event, checked) {
    this.setState({ [event.target.name]: checked });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="answer-in-thread-form">
        <Paper className="answer-in-thread-form__container">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(this.state);
            }}
          >
            <h3 className="header">Take a dump, please</h3>
            <TextField
              name="title"
              label="Title"
              onChange={this.handleInputChange}
              fullWidth
              className="post-text-input"
            />
            <TextField
              name="text"
              label="Post"
              onChange={this.handleInputChange}
              fullWidth
              multiline
              className="post-text-input"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="sage"
                  checked={this.state.sage}
                  onChange={this.handleCheckboxChange}
                />
              }
              label="Sage"
            />
            <div className="submit-button-container">
              <Button
                type="submit"
                raised
                color="primary"
              >
                Answer in thread
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export default CreateThreadForm;
