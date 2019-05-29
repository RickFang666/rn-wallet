import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import AddressInput from './AddressInput';
import VerificationCodeInput from './VerificationCodeInput';
import ConfirmationModal from './ConfirmationModal';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import { Entries, Entry, Divider } from '../../components/Settings';
import WarningMessage from '../../components/WarningMessage';
import Button from '../../components/Button';
import {
  sendVerificationCodeByMail,
  sendVerificationCodeByPhone,
  changePhoneNumber,
  changeEmail,
} from '../../reducers/account';

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

@connect()
class ChangeAddress extends Component {
  static navigationOptions = ({ navigation }) => {
    const { addressType } = navigation.state.params;

    if (addressType === 'mobile') {
      return { title: '绑定手机' };
    } else if (addressType === 'email') {
      return { title: '绑定邮箱' };
    }
    return { title: null };
  };

  state = {
    confirmed: false,
    address: this.props.navigation.state.params.address || '',
    verificationCode: '',
  }

  onAddressChange = (address) => {
    this.setState({ address });
  }

  onVerificationCodeChange = (verificationCode) => {
    this.setState({ verificationCode });
  }

  onVerificationCodeSend = () => {
    const { dispatch, navigation } = this.props;
    const { addressType } = navigation.state.params;
    const { address } = this.state;

    if (addressType === 'mobile') {
      dispatch(sendVerificationCodeByPhone(address));
    } else if (addressType === 'email') {
      dispatch(sendVerificationCodeByMail(address));
    }
  }

  onInformationConfirmPress = () => {
    this.setState({ confirmed: true });
  }

  onPasswordConfirmPress = (password) => {
    const { dispatch, navigation } = this.props;
    const { addressType } = navigation.state.params;
    const { address, verificationCode } = this.state;

    this.setState({ confirmed: false });
    if (addressType === 'mobile') {
      dispatch(changePhoneNumber(address, verificationCode, password))
        .then((action) => {
          if (action.error) {
            this.warning.show();
          } else {
            navigation.goBack();
          }
        });
    } else if (addressType === 'email') {
      dispatch(changeEmail(address, verificationCode, password))
        .then((action) => {
          if (action.error) {
            this.warning.show();
          } else {
            navigation.goBack();
          }
        });
    }
  }

  closeModal = () => {
    this.setState({ confirmed: false });
  }

  render() {
    let placeholder;

    const { addressType } = this.props.navigation.state.params;
    const {
      address, verificationCode, confirmed,
    } = this.state;

    if (addressType === 'mobile') {
      placeholder = '手机号码';
    } else if (addressType === 'email') {
      placeholder = '邮箱地址';
    }

    return (
      <Container>
        <Entries>
          <Entry>
            <AddressInput
              value={address}
              placeholder={placeholder}
              onChange={this.onAddressChange}
            />
          </Entry>
          <Divider />
          <Entry>
            <VerificationCodeInput
              placeholder="请设置验证码"
              onChange={this.onVerificationCodeChange}
              onSend={this.onVerificationCodeSend}
              disabled={address.length === 0}
            />
          </Entry>
        </Entries>
        <ConfirmationModal
          title="验证身份"
          isVisible={confirmed}
          onConfirm={this.onPasswordConfirmPress}
          onClose={this.closeModal}
        />
        <ConfirmButton
          title="确认修改"
          onPress={this.onInformationConfirmPress}
          disabled={!address.length || !verificationCode.length}
        />
        <WarningMessage message="修改错误，请检查输入" ref={(ref) => { this.warning = ref; }} />
      </Container>
    );
  }
}

export default ChangeAddress;
