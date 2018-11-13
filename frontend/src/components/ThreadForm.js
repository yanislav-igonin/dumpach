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

import { createThread } from '../store/actions/thread';

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
    attachmentsPreviews.forEach(attachment => URL.revokeObjectURL(attachment.preview));
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
        preview: URL.createObjectURL(file)
      })),
      attachments: acceptedFiles
    });
  };

  onSend = () => {
    const { boardId } = this.props;

    this.props.createThread(boardId, this.state);
  };

  renderAttachemnts = attachments => {
    // TODO: add attachments removing
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
          <img
            key={attachment.preview}
            style={{ maxHeight: 100, maxWidth: '100%', marginBottom: 10 }}
            src={attachment.preview}
          />
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
        <AttachFileIcon style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 50 }} />
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
              Create thread
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
  createThread: (boardId, data) => {
    dispatch(createThread(boardId, data));
  }
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ThreadForm)
);
