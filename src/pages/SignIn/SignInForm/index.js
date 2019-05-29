import React, { Component } from 'react';
import styled from 'styled-components/native';
import UserNameInput from './UserNameInput';
import PasswordInput from './PasswordInput';
import Button from '../../../components/Button';

const Form = styled.View`
  margin-top: 60;
  margin-bottom: 25;
`;

const SignInButton = styled(Button)`
  margin-top: 60;
`;

export default class SignInForm extends Component {
  state = {
    username: '',
    password: '',
  }

  onUserNameChange = username => this.setState({ username })

  onPasswordChange = password => this.setState({ password })

  onSignIn = () => {
    const { username, password } = this.state;

    if (username.length && password.length) {
      this.props.onSubmit(username, password);
    }
  }

  isButtonDisabled = () => {
    const { username, password } = this.state;

    return !username.length || !password.length;
  }

  render() {
    return (
      <Form>
        <UserNameInput onChange={this.onUserNameChange} />
        <PasswordInput onChange={this.onPasswordChange} />
        <SignInButton title="登录" onPress={this.onSignIn} disabled={this.isButtonDisabled()} />
      </Form>
    );
  }
}
