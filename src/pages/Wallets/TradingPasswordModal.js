import React, { Component } from 'react';
import styled from 'styled-components/native';
import CoinsLogo from '../../components/CoinsLogo';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const Description = styled.Text`
  font-size: 15;
  line-height: 25;
  color: #333333;
  margin-top: 30;
`;

const ConfirmButton = styled(Button)`
  margin-top: 30;
`;

export default class TradingPasswordModal extends Component {
  state = {
    visible: this.props.isVisible,
  }

  onConfirm = () => {
    this.props.onConfirm();
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;

    return (
      <Modal isVisible={visible}>
        <CoinsLogo />
        <Description>为了保障您的资产安全，请设置交易密码后再进行钱包操作！</Description>
        <ConfirmButton title="立刻设置" onPress={this.onConfirm} />
      </Modal>
    );
  }
}
