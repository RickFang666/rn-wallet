import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PasswordInput from './PasswordInput';
import BackgroundImage from '../../components/BackgroundImage';
import TouchToDismissKeyboard from '../../components/TouchToDismissKeyboard';
import Button from '../../components/Button';
import WarningMessage from '../../components/WarningMessage';
import { getRegisterationInformation } from '../../reducers';
import { register } from '../../reducers/account';

const VALID_PASSWORD_REGEX = /^.{8,}$/;

const Container = styled(BackgroundImage)`
  justify-content: center;
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 60;
  padding-right: 60;
`;

const RegisterButton = styled(Button).attrs({
  disabled: ({ disabled }) => disabled,
})`
  margin-top: 100;
`;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'SignIn' }),
  ],
});

const mapStateToProps = state => ({
  registerationInformation: getRegisterationInformation(state),
});

@connect(mapStateToProps)
class SetPassword extends Component {
  state = {
    password: '',
    confirmedPassword: '',
  }

  onSubmit = () => {
    if (this.isPasswordValid()) {
      this.props.dispatch(register({
        ...this.props.registerationInformation,
        password: this.state.password,
      })).then((action) => {
        if (action.error) {
          this.failureWarning.show();
        } else {
          this.props.navigation.dispatch(resetAction);
        }
      });
    } else {
      this.passwordWarning.show();
    }
  }

  onPasswordChange = password => this.setState({ password })

  onConfirmedPasswordChange = confirmedPassword => this.setState({ confirmedPassword })

  isPasswordValid = () => {
    const { password, confirmedPassword } = this.state;

    return password === confirmedPassword && VALID_PASSWORD_REGEX.test(password);
  }

  render() {
    const {
      password, confirmedPassword,
    } = this.state;

    return (
      <TouchToDismissKeyboard>
        <Container>
          <PasswordInput placeholder="8位数以上的非纯数字密码" onChange={this.onPasswordChange} />
          <PasswordInput placeholder="请再次输入密码" onChange={this.onConfirmedPasswordChange} />
          <RegisterButton title="登录" onPress={this.onSubmit} disabled={password.length === 0 || password !== confirmedPassword} />
          <WarningMessage message="密码格式错误" ref={(ref) => { this.passwordWarning = ref; }} />
          <WarningMessage message="注册失败，请检查用户名格式和密码" ref={(ref) => { this.failureWarning = ref; }} />
        </Container>
      </TouchToDismissKeyboard>
    );
  }
}

export default SetPassword;
