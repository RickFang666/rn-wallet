import React, { Component } from 'react';
import styled from 'styled-components/native';
import CoinsLogo from '../../components/CoinsLogo';
import Button from '../../components/Button';
import SecondaryButton from '../../components/SecondaryButton';
import Modal from '../../components/Modal';

const Description = styled.Text`
  font-size: 15;
  line-height: 25;
  color: #333333;
  margin-top: 30;
`;

const Buttons = styled.View`
  flex-direction: row;
  margin-top: 30;
  margin-left: -8;
  margin-right: -8;
`;

const CancelButton = styled(SecondaryButton)`
  flex: 1;
  margin-left: 8;
  margin-right: 8;
`;

const ConfirmButton = styled(Button)`
  flex: 1;
  margin-left: 8;
  margin-right: 8;
`;

export default class CreateWalletModal extends Component {
  state = {
    visible: this.props.isVisible,
  }

  onClose = () => {
    this.setState({ visible: false });
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
        <Description>开通钱包功能可直接从钱包转入 是否开通？</Description>
        <Buttons>
          <CancelButton title="稍后设置" onPress={this.onClose} />
          <ConfirmButton title="立刻设置" onPress={this.onConfirm} />
        </Buttons>
      </Modal>
    );
  }
}
