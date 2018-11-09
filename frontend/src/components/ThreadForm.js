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

const styles = theme => ({
  formContainer: {
    margin: '0 10px'
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
          <Dropzone
          // onDrop={this.onDrop}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSage}
                  onChange={(event) => this.onChecboxChange(event, 'isSage')}
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
