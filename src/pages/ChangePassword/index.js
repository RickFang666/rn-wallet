import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import PasswordInput from './PasswordInput';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import WarningMessage from '../../components/WarningMessage';
import { Entries, Entry, Divider } from '../../components/Settings';
import Button from '../../components/Button';
import {
  changePassword,
  changeTradingPassword,
} from '../../reducers/account';

const VALID_PASSWORD_REGEX = /^.{8,}$/;

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})`
  display: flex;
  background: #F2F2F2;
`;

const ConfirmButton = styled(Button)`
  margin-top: 60;
  margin-left: 30;
  margin-right: 30;
`;

@connect()
class ChangePassword extends Component {
  static navigationOptions = ({ navigation }) => {
    const { passwordType } = navigation.state.params;

    if (passwordType === 'login') {
      return { title: '修改登录密码' };
    } else if (passwordType === 'trading') {
      return { title: '修改交易密码' };
    }
    return { title: '修改密码' };
  };

  state = {
    oldPassword: '',
    newPassword: '',
    confirmedNewPassword: '',
  }

  onOldPasswordChange = (oldPassword) => {
    this.setState({ oldPassword });
  }

  onNewPasswordChange = (newPassword) => {
    this.setState({ newPassword });
  }

  onConfirmedNewPasswordChange = (confirmedNewPassword) => {
    this.setState({ confirmedNewPassword });
  }

  onConfirmPress = () => {
    const { dispatch, navigation } = this.props;
    const { oldPassword, newPassword } = this.state;
    const { passwordType } = navigation.state.params;

    if (this.isPasswordValid()) {
      if (passwordType === 'login') {
        dispatch(changePassword(oldPassword, newPassword))
          .then((action) => {
            if (!action.error) {
              navigation.goBack();
            } else {
              this.failureWarning.show();
            }
          });
      } else if (passwordType === 'trading') {
        dispatch(changeTradingPassword(oldPassword, newPassword))
          .then((action) => {
            if (!action.error) {
              navigation.goBack();
            } else {
              this.failureWarning.show();
            }
          });
      }
    } else {
      this.passwordWarning.show();
    }
  }

  isPasswordValid = () => {
    const { newPassword, confirmedNewPassword } = this.state;

    return newPassword === confirmedNewPassword && VALID_PASSWORD_REGEX.test(newPassword);
  }

  render() {
    return (
      <Container>
        <Entries>
          <Entry>
            <PasswordInput placeholder="请输入原密码" onChange={this.onOldPasswordChange} />
          </Entry>
          <Divider />
          <Entry>
            <PasswordInput placeholder="请设置新密码" onChange={this.onNewPasswordChange} />
          </Entry>
          <Divider />
          <Entry>
            <PasswordInput placeholder="请再次输入新密码" onChange={this.onConfirmedNewPasswordChange} />
          </Entry>
        </Entries>
        <WarningMessage message="修改失败，请检查输入" ref={(ref) => { this.failureWarning = ref; }} />
        <WarningMessage message="密码错误，请检查输入" ref={(ref) => { this.passwordWarning = ref; }} />
        <ConfirmButton title="确认修改" onPress={this.onConfirmPress} />
      </Container>
    );
  }
}

export default ChangePassword;
