import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dropzone from 'react-dropzone';

import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../../Snackbar/actions';

import './CreateThreadForm.scss';

class CreateThreadForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      files: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDrop(acceptedFiles, rejectedFiles) {
    this.setState({ files: acceptedFiles.slice(0, 6) });
  }

  handleSubmit(event) {
    const { handleSubmit, dispatch } = this.props;
    const { text, files } = this.state;
    event.preventDefault();
    if (text === '' && files.length === 0) {
      dispatch({
        type: OPEN_SNACKBAR,
        message: 'Post text or files can\'t be empty',
      });
      setTimeout(
        () =>
          dispatch({
            type: CLOSE_SNACKBAR,
          }),
        5000
      );
    } else {
      handleSubmit(this.state);
    }
  }

  renderDropzoneContent() {
    let content = <i className="material-icons">attach_file</i>;

    if (this.state.files.length > 0) {
      content = this.renderDropzoneFilesPreview();
    }

    return content;
  }

  renderDropzoneFilesPreview() {
    return this.state.files.map(file => (
      <div key={file.preview} className="file-preview-container">
        <img className="file-preview" src={file.preview} alt="file-preview" />
      </div>
    ));
  }

  render() {
    return (
      <div className="create-thread-form">
        <Paper className="create-thread-form__container">
          <form onSubmit={this.handleSubmit}>
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
            <Dropzone
              className="dropzone"
              accept={'image/*'}
              onDrop={this.handleDrop}
              maxSize={6291456}
            >
              <div className="dropzone__content">
                {this.renderDropzoneContent()}
              </div>
            </Dropzone>
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
