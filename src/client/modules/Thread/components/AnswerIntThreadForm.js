import React from 'react';
import { Form, TextArea, Input, Button, Icon, Checkbox } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../../Snackbar/duck';

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
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = (event, { checked }) => {
    this.setState({ sage: checked });
  };

  handleDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({ files: acceptedFiles.slice(0, 6) });
  };

  handleSubmit = (event) => {
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
      handleSubmit(this.state, this.clearForm);
    }
  };

  clearForm = () => {
    this.setState({
      title: '',
      text: '',
      sage: false,
      files: [],
    });
  };

  handleChange = (value) => {
    this.setState({text: value});
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
      <div className="answer-in-thread-form">
        <div className="answer-in-thread-form__content">
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
            <TextArea
              name="text"
              placeholder="Post"
              onChange={this.handleInputChange}
              autoHeight
              className="post-text-input"
              value={text}
            />

            <ReactQuill
              value={text}
              onChange={this.handleChange}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                  ],
                ],
              }}
              formats={[
                'header',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'indent',
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
            <Checkbox
              name="sage"
              checked={this.state.sage}
              onChange={this.handleCheckboxChange}
              label="Sage"
            />
            <div className="submit-button-container">
              <Button type="submit" primary>
                Answer in thread
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateThreadForm;
