import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 20;
  padding-right: 20;
  background: #F2F2F2;
`;

const Warning = styled.Text`
  font-size: 12;
  color: #FF1717;
  margin-bottom: 5;
`;

export default () => (
  <Container>
    <Warning>*密码用于交易授权</Warning>
    <Warning>*TraderIO不储存密码，也无法帮您找回，请务必牢记</Warning>
  </Container>
);
