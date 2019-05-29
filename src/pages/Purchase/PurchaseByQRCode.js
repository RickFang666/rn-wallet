import React from 'react';
import styled from 'styled-components/native';
import QRCode from 'react-native-qrcode';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

const Container = styled.View``;

const Panel = styled.View`
  align-items: center;
  background: #FFFFFF;
  padding-top: 25;
  padding-bottom: 25;
  padding-left: 30;
  padding-right: 30;
  margin-top: 10;
  margin-bottom: 40;
`;

const StyledLogo = styled(Logo)`
  margin-bottom: 20;
`;

const Address = styled.Text`
  font-size: 15;
  color: rgba(153, 153, 153, 0.7);
  margin-top: 20;
`;

const CopyToClipboardButton = styled(Button)`
  margin-left: 30;
  margin-right: 30;
`;

export default ({ coinType, address, onCopyToClipboard }) => (
  <Container>
    <Panel>
      <StyledLogo coinType={coinType} size={60} />
      <QRCode
        value={address}
        size={150}
        bgColor="black"
        fgColor="white"
      />
      <Address>{ address }</Address>
    </Panel>
    <CopyToClipboardButton title="复制收款地址" onPress={onCopyToClipboard} />
  </Container>
);
