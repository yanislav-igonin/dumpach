import React from 'react';
import Dropzone from 'react-dropzone';
import { Form, Input, Button, Icon } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../../Snackbar/duck';

import './CreateThreadForm.scss';

class CreateThreadForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      files: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTextareaChange = (value) => {
    this.setState({ text: value });
  };

  handleDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({ files: acceptedFiles.slice(0, 6) });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { handleSubmit, dispatch } = this.props;
    const { text, files } = this.state;

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
  };

  renderDropzoneContent() {
    let content = <Icon name="attach" size="huge" className="attach-icon" />;

    if (this.state.files.length > 0) {
      content = this.renderDropzoneFilesPreview();
    }

    return content;
  }

  renderDropzoneFilesPreview() {
    return this.state.files.map((file) => (
      <div key={file.preview} className="file-preview-container">
        <img className="file-preview" src={file.preview} alt="file-preview" />
      </div>
    ));
  }

  render() {
    const { title, text } = this.state;

    return (
      <div className="create-thread-form">
        <div className="create-thread-form__content">
          <Form onSubmit={this.handleSubmit}>
            <h3 className="header">Take a dump, please</h3>
            <Input
              name="title"
              placeholder="Title"
              onChange={this.handleInputChange}
              fluid
              className="post-text-input"
              value={title}
            />

            <ReactQuill
              value={text}
              placeholder="Text"
              onChange={this.handleTextareaChange}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ script: 'sub' }, { script: 'super' }],
                  ['video'],
                ],
              }}
              formats={[
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'script',
                'video',
              ]}
            />
            <Dropzone
              className="dropzone"
              accept={'image/*'}
              onDrop={this.handleDrop}
              maxSize={6291456}
            >
              <div className="dropzone__content">{this.renderDropzoneContent()}</div>
            </Dropzone>
            <div className="submit-button-container">
              <Button type="submit" primary>
                Create thread
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateThreadForm;
