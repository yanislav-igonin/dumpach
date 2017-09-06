import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Dropzone from 'react-dropzone';

import './AnswerIntThreadForm.scss';

class CreateThreadForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      sage: false,
      files: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCheckboxChange(event, checked) {
    this.setState({ [event.target.name]: checked });
  }

  handleDrop(acceptedFiles, rejectedFiles) {
    this.setState({ files: acceptedFiles.slice(0, 6) });
  }

  handleSubmit(event) {
    const { handleSubmit } = this.props;
    const { text, files } = this.state;
    event.preventDefault();
    if (text === '' && files.length === 0) {
      // error
    } else {
      handleSubmit(this.state, this.clearForm);
    }
  }

  clearForm() {
    this.setState({
      title: '',
      text: '',
      sage: false,
      files: [],
    });
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
      <div className="answer-in-thread-form">
        <Paper className="answer-in-thread-form__container">
          <form onSubmit={this.handleSubmit}>
            <h3 className="header">Take a dump, please</h3>
            <TextField
              name="title"
              label="Title"
              value={this.state.title}
              onChange={this.handleInputChange}
              fullWidth
              className="post-text-input"
            />
            <TextField
              name="text"
              label="Post"
              value={this.state.text}
              onChange={this.handleInputChange}
              fullWidth
              multiline
              className="post-text-input"
            />
            <Dropzone
              className="dropzone"
              accept={'image/*'}
              onDrop={this.handleDrop}
            >
              <div className="dropzone__content">
                {this.renderDropzoneContent()}
              </div>
            </Dropzone>
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
              <Button type="submit" raised color="primary">
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
