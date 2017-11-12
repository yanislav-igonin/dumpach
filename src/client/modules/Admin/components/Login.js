import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'semantic-ui-react';
import { login } from '../duck';

import './Login.scss';

class Login extends Component {
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state);
  };

  render() {
    const { login, password } = this.state;

    return (
      <div className="login">
        <div className="login__content">
          <Form onSubmit={this.handleSubmit}>
            <Input
              name="login"
              placeholder="Login"
              onChange={this.handleInputChange}
              fluid
              className="post-text-input"
              value={login}
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              onChange={this.handleInputChange}
              fluid
              className="post-text-input"
              value={password}
            />
            <div className="submit-button-container">
              <Button type="submit" primary>
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { login })(Login);
