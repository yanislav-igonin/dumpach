import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import './CreateThreadForm.scss';

class CreateThreadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="create-thread-form">
        <Paper className="create-thread-form__container">
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
            <div className="submit-button-container">
              <Button type="submit" raised color="primary">
                Create thread
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export default CreateThreadForm;
