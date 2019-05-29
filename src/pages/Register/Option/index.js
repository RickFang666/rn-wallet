import React from 'react';
import styled from 'styled-components/native';

const Touchable = styled.TouchableOpacity`
  display: flex;
  align-items: center;
`;

const Icon = styled.Image.attrs({
  source: ({ source }) => source,
})`
  width: 60;
  height: 60;
  margin-bottom: 10;
  opacity: ${({ active }) => (active ? '1' : '0.6')};
`;

const Label = styled.Text`
  font-size: 13;
  color: rgba(255, 255, 255, 0.6);
`;

export default ({
  label, icon, active, onPress,
}) => (
  <Touchable onPress={onPress}>
    <Icon source={icon} active={active} />
    <Label>{ label }</Label>
  </Touchable>
);
