import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dropzone from 'react-dropzone';

import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { createThread, updateThread } from '../store/actions/thread';

const styles = theme => ({
  formContainer: {
    margin: '0 10px 20px 10px'
  },
  controlsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  dropZone: {
    width: 'initial',
    minHeight: 150,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20
  },
  attachmentIcon: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  sendIcon: {
    marginLeft: theme.spacing.unit
  }
});

class ThreadForm extends PureComponent {
  state = {
    title: '',
    text: '',
    isSage: false,
    attachments: [],
    attachmentsPreviews: []
  };

  componentWillUnmount() {
    const { attachmentsPreviews } = this.state;
    attachmentsPreviews.forEach(attachment =>
      URL.revokeObjectURL(attachment.preview)
    );
  }

  onInputChange = (event, name) => {
    this.setState({
      [name]: event.target.value
    });
  };

  onChecboxChange = (event, name) => {
    this.setState({
      [name]: event.target.checked
    });
  };

  onAttachmentsDrop = acceptedFiles => {
    this.setState({
      attachmentsPreviews: acceptedFiles.map(file => ({
        preview: URL.createObjectURL(file),
        name: file.name
      })),
      attachments: acceptedFiles
    });
  };

  onRemoveAttachment = (event, name) => {
    event.preventDefault();

    const { attachments, attachmentsPreviews } = this.state;

    URL.revokeObjectURL(
      attachmentsPreviews.find(attachmentPreview => attachmentPreview.name === name)
        .preview
    );

    this.setState({
      attachments: attachments.filter(attachment => attachment.name !== name),
      attachmentsPreviews: attachmentsPreviews.filter(
        attachmentPreview => attachmentPreview.name !== name
      )
    });
  };

  onSend = () => {
    const { boardId, threadId, newThread } = this.props;

    if (newThread) {
      this.props.createThread(
        boardId,
        this.state,
        this.clearForm,
        this.redirectOnThread
      );
    } else {
      this.props.updateThread(boardId, threadId, this.state, this.clearForm);
    }
  };

  clearForm = () => {
    const { attachmentsPreviews } = this.state;
    attachmentsPreviews.forEach(attachment =>
      URL.revokeObjectURL(attachment.preview)
    );

    this.setState({
      title: '',
      text: '',
      isSage: false,
      attachments: [],
      attachmentsPreviews: []
    });
  };

  redirectOnThread = threadId => {
    const { boardId, history } = this.props;

    history.push(`${boardId}/${threadId}`);
  };

  renderAttachemnts = attachments => {
    return attachments.length > 0 ? (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 10px 0'
        }}
      >
        {attachments.map(attachment => (
          <div key={attachment.preview}>
            <img
              style={{ maxHeight: 100, maxWidth: '100%', marginBottom: 10 }}
              src={attachment.preview}
            />
            <HighlightOffIcon
              style={{
                position: 'relative',
                right: 24,
                top: -86,
                cursor: 'pointer'
              }}
              onClick={event => this.onRemoveAttachment(event, attachment.name)}
            />
          </div>
        ))}
      </div>
    ) : (
      <div
        style={{
          height: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <AttachFileIcon
          style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 50 }}
        />
      </div>
    );
  };

  render() {
    const { title, text, isSage, attachmentsPreviews } = this.state;
    const { classes, newThread } = this.props;

    return (
      <Card className={classes.formContainer}>
        <CardContent>
          <TextField
            id="title"
            label="title"
            value={title}
            fullWidth={true}
            onChange={event => this.onInputChange(event, 'title')}
            margin="normal"
          />
          <TextField
            id="text"
            label="text"
            value={text}
            fullWidth={true}
            onChange={event => this.onInputChange(event, 'text')}
            margin="normal"
          />
          <Dropzone onDrop={this.onAttachmentsDrop} className={classes.dropZone}>
            {this.renderAttachemnts(attachmentsPreviews)}
          </Dropzone>
          <div className={classes.controlsContainer}>
            <FormGroup row>
              {!newThread ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isSage}
                      onChange={event => this.onChecboxChange(event, 'isSage')}
                      value="isSage"
                      color="primary"
                    />
                  }
                  label="sage"
                />
              ) : null}
            </FormGroup>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.onSend()}
            >
              {newThread ? 'Create thread' : 'Post in thread'}
              <SendIcon className={classes.sendIcon} />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  createThread: (boardId, data, clearForm, redirectOnThread) => {
    dispatch(createThread(boardId, data, clearForm, redirectOnThread));
  },
  updateThread: (boardId, threadId, data, clearForm) => {
    dispatch(updateThread(boardId, threadId, data, clearForm));
  }
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ThreadForm)
);
