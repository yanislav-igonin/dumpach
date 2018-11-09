import React, { PureComponent } from 'react';

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

const styles = () => ({
  formContainer: {
    margin: '0 10px'
  },
  dropZone: {
    width: 'initial',
    height: 100,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  attachmentIcon: {
    color: 'rgba(255, 255, 255, 0.7)'
  }
});

class ThreadForm extends PureComponent {
  state = {
    title: '',
    text: '',
    isSage: false,
    attachments: []
  };

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
      attachments: acceptedFiles
    });
  };

  renderAttachemnts = attachments => {
    return attachments.length > 0 ? (
      <p>SOSI HUI</p>
    ) : (
      <AttachFileIcon style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 50 }} />
    );
  };

  render() {
    const { title, text, isSage, attachments } = this.state;
    const { classes } = this.props;

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
            {this.renderAttachemnts(attachments)}
          </Dropzone>
          <FormGroup row>
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
          </FormGroup>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ThreadForm);
