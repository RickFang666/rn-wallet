import React from 'react';
import styled from 'styled-components/native';

const Touchable = styled.TouchableOpacity`
  flex: 1;
  height: 50;
  justify-content: center;
  align-items: center;
  background: #D5C7B1;
`;

const Label = styled.Text`
  font-size: 16;
  color: #FFFFFF;
`;

export default ({ onPress }) => (
  <Touchable onPress={onPress}>
    <Label>转出</Label>
  </Touchable>
);
