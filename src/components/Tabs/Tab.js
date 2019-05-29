import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: relative;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 50;
  background: #FFFFFF;
`;

const Label = styled.Text`
  font-size: 15;
  color: ${({ active }) => (active ? '#CFAF81' : '#999999')};
`;

const Underline = styled.View`
  position: absolute;
  bottom: 0;
  width: 100;
  left: 50%;
  margin-left: -50;
  border-width: 1;
  border-color: #CFAF81;
  display: ${({ active }) => (active ? 'flex' : 'none')};
`;

export default ({ title, active, onPress }) => (
  <Container active={active} onPress={onPress}>
    <Label active={active}>{ title }</Label>
    <Underline active={active} />
  </Container>
);
