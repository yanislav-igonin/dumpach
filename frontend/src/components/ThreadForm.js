import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

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

  render() {
    const { title, text, isSage, attachments } = this.state;
    const { classes } = this.props;

    return (
      <Card className={classes.formContainer}>
        <CardContent>
          <TextField
            id="title"
            label="title"
            // className={classes.textField}
            value={title}
            fullWidth={true}
            // onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="text"
            label="text"
            // className={classes.textField}
            value={text}
            fullWidth={true}
            // onChange={this.handleChange('name')}
            margin="normal"
          />
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSage}
                  // onChange={this.handleChange('checkedB')}
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
