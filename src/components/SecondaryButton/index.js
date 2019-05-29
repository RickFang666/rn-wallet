import React from 'react';
import styled from 'styled-components/native';

const Touchable = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 14;
  padding-bottom: 14;
  background-color: #FFFFFF;
  border-radius: 4;
  border-width: 1;
  border-color: #BBBBBB;
`;

const Title = styled.Text`
  font-size: 16;
  color: #BBBBBB;
`;

export default ({
  title, onPress, style,
}) => (
  <Touchable onPress={onPress} style={style}>
    <Title>{ title }</Title>
  </Touchable>
);
