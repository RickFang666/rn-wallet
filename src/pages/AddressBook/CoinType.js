import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120;
  height: 50;
  position: relative;
`;

const Label = styled.Text`
  font-size: 15;
  color: ${({ selected }) => (selected ? '#CFAF81' : '#999999')};
`;

const Underline = styled.View`
  position: absolute;
  bottom: 0;
  left: 30;
  width: 60;
  border-top-width: 3;
  border-top-color: #CFAF81;
`;

export default ({ name, selected }) => (
  <Container>
    <Label selected={selected}>{ name }</Label>
    { selected && <Underline /> }
  </Container>
);
