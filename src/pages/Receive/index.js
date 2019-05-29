import React, { Component } from 'react';
import { Clipboard } from 'react-native';
import styled from 'styled-components/native';
import QRCode from 'react-native-qrcode';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})`
  display: flex;
  flex: 1;
  justify-content: center;
  padding-left: 30;
  padding-right: 30;
  background: #2A2A2A;
`;

const Panel = styled.View`
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border-radius: 4;
  padding-top: 25;
  padding-bottom: 25;
  padding-left: 50;
  padding-right: 50;
`;

const StyledLogo = styled(Logo)`
  margin-bottom: 20;
`;

const Address = styled.Text`
  font-size: 16;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 30;
  margin-bottom: 30;
`;

export default class Receive extends Component {
  onCopyToClipboardPress = () => {
    const { address } = this.props.navigation.state.params;

    Clipboard.setString(address);
  }

  render() {
    const { coinType, address } = this.props.navigation.state.params;

    return (
      <Container>
        <Panel>
          <StyledLogo coinType={coinType} size={60} />
          <QRCode
            value={address}
            size={200}
            bgColor="black"
            fgColor="white"
          />
        </Panel>
        <Address>{ address }</Address>
        <Button title="复制收款地址" onPress={this.onCopyToClipboardPress} />
      </Container>
    );
  }
}
