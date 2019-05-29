import React from 'react';
import styled from 'styled-components/native';

const Touchable = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 14;
  padding-bottom: 14;
  background-color: ${({ disabled }) => (disabled ? 'rgba(207, 175, 129, 0.6)' : '#CFAF81')}
  border-radius: 4;
`;

const Title = styled.Text`
  font-size: 16;
  color: #FFFFFF;
`;

export default ({
  title, onPress, disabled, style,
}) => (
  <Touchable onPress={onPress} disabled={disabled} style={style}>
    <Title>{ title }</Title>
  </Touchable>
);
