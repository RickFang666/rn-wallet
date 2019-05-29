import React, { Component } from 'react';
import styled from 'styled-components/native';
import NativeModal from 'react-native-modal';
import Close from './Close';

const CenterModal = styled(NativeModal)`
  justify-content: center;
`;

const Header = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40;
  background: #FFFFFF;
  border-top-left-radius: 6;
  border-top-right-radius: 6;
  position: relative;
`;

const Content = styled.View`
  display: flex;
  justify-content: center;
  background: #FFFFFF;
  padding-bottom: 40;
  padding-left: 40;
  padding-right: 40;
  border-bottom-left-radius: 6;
  border-bottom-right-radius: 6;
`;

export default class Modal extends Component {
  state = {
    isVisible: this.props.isVisible,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isVisible: nextProps.isVisible });
  }

  close = () => {
    const { onClose } = this.props;

    this.setState({ isVisible: false });
    if (onClose) {
      onClose();
    }
  }

  render() {
    const { children } = this.props;
    const { isVisible } = this.state;

    return (
      <CenterModal animationIn="fadeIn" animationOut="fadeOut" isVisible={isVisible} onBackdropPress={this.close}>
        <Header>
          <Close onPress={this.close} />
        </Header>
        <Content>
          { children }
        </Content>
      </CenterModal>
    );
  }
}
