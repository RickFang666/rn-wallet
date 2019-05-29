import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10;
  padding-bottom: 10;
  margin-top: 25;
  border-bottom-width: 1;
  border-bottom-color: #E7E7E7;
`;

const Label = styled.Text`
  font-size: 16;
  color: #999999;
`;

const Value = styled.Text`
  font-size: 14;
  color: #333333;
  margin-left: 20;
`;

export default ({ label, value }) => (
  <Container>
    <Label>{ label }</Label>
    <Value>{ value }</Value>
  </Container>
);
