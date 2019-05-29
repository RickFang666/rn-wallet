import React, { Component } from 'react';
import styled from 'styled-components/native';
import BottomModal from '../../components/BottomModal';
import Button from '../../components/Button';

const Label = styled.Text`
  font-size: 16;
  color: #999999;
  align-self: center;
`;

const PasswordInput = styled.TextInput.attrs({
  secureTextEntry: true,
  underlineColorAndroid: 'transparent',
})`
  margin-top: 30;
  font-size: 28;
  padding-top: 10;
  padding-bottom: 10;
  border-bottom-width: 1;
  border-bottom-color: #E7E7E7;
`;

const Warning = styled.Text`
  font-size: 12;
  color: #FF1717;
  margin-top: 12;
`;

const ConfirmButton = styled(Button)`
  margin-top: 60;
`;

export default class ConfirmationModal extends Component {
  state = {
    password: '',
  }

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  onConfirm = () => {
    this.props.onConfirm(this.state.password);
  }

  render() {
    const {
      title, isVisible, showWarning, onClose,
    } = this.props;
    const { password } = this.state;

    return (
      <BottomModal title={title} isVisible={isVisible} onClose={onClose}>
        <Label>请输入密码</Label>
        <PasswordInput onChangeText={this.onPasswordChange} />
        {
          showWarning &&
            <Warning>（密码错误，请重新输入）</Warning>
        }
        <ConfirmButton title="确认" onPress={this.onConfirm} disabled={!password.length} />
      </BottomModal>
    );
  }
}
