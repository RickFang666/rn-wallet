import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Mark = styled.View`
  width: 3;
  height: 12;
  background: #CDA469;
  margin-right: 8;
`;

const Label = styled.Text`
  font-size: 12;
  color: #FFFFFF;
`;

export default ({ children }) => (
  <Container>
    <Mark />
    <Label>{ children }</Label>
  </Container>
);
