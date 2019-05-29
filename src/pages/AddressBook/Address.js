import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View``;

const Address = styled.Text`
  font-size: 16;
  color: #333333;
`;

export default ({ address }) => (
  <Container>
    <Address>{ address }</Address>
  </Container>
);
