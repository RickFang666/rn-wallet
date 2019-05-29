import React, { Component } from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import Close from './Close';
import GoBack from './GoBack';
import Amount from './Amount';
import Address from './Address';
import Fee from './Fee';
import FormattedValue from '../FormattedValue';
import Button from '../Button';

const BottomModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;

const Header = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 14;
  padding-bottom: 14;
  padding-left: 14;
  padding-right: 14;
  background: #FFFFFF;
  position: relative;
  border-bottom-width: 1;
  border-bottom-color: #E7E7E7;
`;

const Title = styled.Text`
  font-size: 16;
  color: #333333;
`;

const Content = styled.View`
  display: flex;
  justify-content: center;
  background: #FFFFFF;
  padding-top: 30;
  padding-bottom: 30;
  padding-left: 30;
  padding-right: 30;
`;

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

const ConfirmButton = styled(Button)`
  margin-top: 60;
`;

export default class ConfirmationModal extends Component {
  static defaultProps = {
    passwordType: 'wallet',
  }

  state = {
    password: '',
    confirmed: false,
  }

  onPasswordConfirmPress = () => {
    this.props.confirm(this.state.password);
    this.onClose();
  }

  onTransactionConfirmPress = () => {
    this.setState({ confirmed: true });
  }

  onGoBack = () => {
    this.setState({ confirmed: false });
  }

  onClose = () => {
    this.setState({ confirmed: false });
    this.props.close();
  }

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  render() {
    const {
      isVisible, coinType, amount, address, fee, passwordType,
    } = this.props;
    const { password, confirmed } = this.state;

    return (
      <BottomModal isVisible={isVisible} onBackdropPress={this.onClose}>
        <Header>
          {
            confirmed ?
              <GoBack onPress={this.onGoBack} /> :
              <Close onPress={this.onClose} />
          }
          <Title>支付详情</Title>
        </Header>
        {
          confirmed ?
          (
            <Content>
              <Label>{ `请输入${passwordType === 'trading' ? '交易' : '钱包'}密码` }</Label>
              <PasswordInput onChangeText={this.onPasswordChange} />
              <ConfirmButton title="确认" onPress={this.onPasswordConfirmPress} disabled={!password.length} />
            </Content>
          ) :
          (
            <Content>
              <Amount coinType={coinType} value={amount} />
              <Address value={address} />
              {
                fee &&
                  <FormattedValue coinType={coinType} value={fee} unit>
                    { formattedValue => <Fee value={formattedValue} /> }
                  </FormattedValue>
              }
              <ConfirmButton title="确认" onPress={this.onTransactionConfirmPress} />
            </Content>
          )
        }
      </BottomModal>
    );
  }
}
