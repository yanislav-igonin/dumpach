import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { login } from '../duck';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    return (
      <div className="login">
        <Paper className="login-form__container">
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="login"
              label="Title"
              value={this.state.title}
              onChange={this.handleInputChange}
              fullWidth
              className="post-text-input"
            />
            <TextField
              name="password"
              type="password"
              label="Title"
              value={this.state.title}
              onChange={this.handleInputChange}
              fullWidth
              className="post-text-input"
            />
            <div className="submit-button-container">
              <Button type="submit" raised color="primary">
                Login
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { login })(Login);
