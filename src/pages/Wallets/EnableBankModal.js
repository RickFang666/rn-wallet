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

export default class EnableBankModal extends Component {
  state = {
    visible: this.props.isVisible,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.isVisible });
  }

  onClose = () => {
    this.props.onClose();
  }

  onConfirm = () => {
    this.props.onConfirm();
  }

  render() {
    const { visible } = this.state;

    return (
      <Modal isVisible={visible} onClose={this.onClose}>
        <CoinsLogo />
        <Description>关闭余币宝之后， 可在系统设置里开启</Description>
        <ConfirmButton title="我知道了" onPress={this.onConfirm} />
      </Modal>
    );
  }
}
