import React from 'react';
import styled from 'styled-components/native';

const Touchable = styled.TouchableOpacity``;

const Label = styled.Text`
  font-size: 14;
  color: rgba(255, 255, 255, 0.6);
`;

export default ({ onPress }) => (
  <Touchable onPress={onPress}>
    <Label>注册账号</Label>
  </Touchable>
);
