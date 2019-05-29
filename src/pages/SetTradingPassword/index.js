import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import PasswordInput from './PasswordInput';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import { Entries, Entry, Divider } from '../../components/Settings';
import Button from '../../components/Button';
import WarningMessage from '../../components/WarningMessage';
import { hasTradingPassword } from '../../reducers';
import { setTradingPassword } from '../../reducers/account';

const VALID_PASSWORD_REGEX = /^.{8,}$/;

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})`
  display: flex;
  flex: 1;
  background: #F2F2F2;
`;

const ConfirmButton = styled(Button)`
  margin-top: 60;
  margin-left: 30;
  margin-right: 30;
`;

const mapStateToProps = state => ({
  hasTradingPassword: hasTradingPassword(state),
});

@connect(mapStateToProps)
class ChangePassword extends Component {
  state = {
    password: '',
    confirmedPassword: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasTradingPassword) {
      this.props.navigation.goBack();
    }
  }

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  onConfirmedPasswordChange = (confirmedPassword) => {
    this.setState({ confirmedPassword });
  }

  onConfirmPress = () => {
    const { dispatch } = this.props;
    const { password, confirmedPassword } = this.state;

    if (this.isPasswordValid()) {
      if (password === confirmedPassword) {
        dispatch(setTradingPassword(password));
      } else {
        this.confirmationWarning.show();
      }
    } else {
      this.passwordWarning.show();
    }
  }

  isPasswordValid = () => VALID_PASSWORD_REGEX.test(this.state.password)

  render() {
    return (
      <Container>
        <Entries>
          <Entry>
            <PasswordInput placeholder="请输入8位交易密码" onChange={this.onPasswordChange} />
          </Entry>
          <Divider />
          <Entry>
            <PasswordInput placeholder="请再次输入交易密码" onChange={this.onConfirmedPasswordChange} />
          </Entry>
        </Entries>
        <ConfirmButton title="完成" onPress={this.onConfirmPress} />
        <WarningMessage message="交易密码格式错误" ref={(ref) => { this.passwordWarning = ref; }} />
        <WarningMessage message="两次输入不相同，请重新检查" ref={(ref) => { this.confirmationWarning = ref; }} />
      </Container>
    );
  }
}

export default ChangePassword;
