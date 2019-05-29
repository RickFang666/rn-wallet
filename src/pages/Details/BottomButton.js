import React from 'react';
import styled from 'styled-components/native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const Touchable = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${({ background }) => background};
  padding-top: 16;
  padding-bottom: ${() => (isIphoneX() ? 36 : 16)};
`;

const Title = styled.Text`
  font-size: 16;
  color: #FFFFFF;
`;

export default ({ title, background, onPress }) => (
  <Touchable background={background} onPress={onPress}>
    <Title>{ title }</Title>
  </Touchable>
);
